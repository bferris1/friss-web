import React from 'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import {LabeledInput} from "../form";

export default class Matches extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            alliance: 'red',
            position: 1,
            matchNumber: 1,
            matches: [],
            teams: [],
            team: null
        }
        ;

        this.handleChange = this.handleChange.bind(this);
        this.updateData = this.updateData.bind(this);
        this.updateMatch = this.updateMatch.bind(this);

    }

    componentDidMount(){
        this.updateData();
    }

    handleChange(e) {
        if (e.target.id === "matchNumber") {
            let newNumber = e.target.value;
            if (newNumber < 1 || newNumber > this.state.matches.length){
                return;
            }
        }
        this.setState({[e.target.id]: e.target.value});
        this.setState({teams:[]});
        // this.updateData();
        this.updateMatch(e.target.value);
    }

    updateMatch() {
        this.setState({team:{}});

        if (!this.state.matchNumber) {
            this.setState({team:null});
            return;
        }
        let teamKey = this.state.matches[this.state.matchNumber - 1]['alliances'][this.state.alliance]['team_keys'][this.state.position - 1];
        let API_URL = 'https://www.thebluealliance.com/api/v3/team/' + teamKey; // TODO: Get selected event.
        let requestHeaders = new Headers();
        requestHeaders.append('X-TBA-Auth-Key', 'KRMfzG8uBUXabV2xdBE2NqyB5ntwAjUvr8RVL47fIdDWh2zKRr0vQjNNQfciVkm3'); // TODO: Use a secure file to store the key.
        let requestOptions = {
            method: 'GET',
            headers: requestHeaders
        };
        fetch (API_URL, requestOptions).then(res => {
            if (res.ok){
                return res.json();
            } else {
                //handle error
            }
        }).then(team => {
            this.setState({team});
        })
    }

    updateData(){
        let API_URL = 'https://www.thebluealliance.com/api/v3/event/2017carv/matches'; // TODO: Get selected event.
        let requestHeaders = new Headers();
        requestHeaders.append('X-TBA-Auth-Key', 'KRMfzG8uBUXabV2xdBE2NqyB5ntwAjUvr8RVL47fIdDWh2zKRr0vQjNNQfciVkm3'); // TODO: Use a secure file to store the key.
        let requestOptions = {
            method: 'GET',
            headers: requestHeaders
        };

        fetch(API_URL, requestOptions).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert('Unable to fetch match data form TheBlueAlliance API.');
            }
        }).then((json) => {
            this.setState({matches:json});
            console.log(json);
            this.updateMatch();
        });
    }

    render() {

        const allianceForm = (
            <FormGroup>
                <Label>Alliance</Label>
                <Input type={"select"} id={"alliance"} value={this.state.alliance} onChange={this.handleChange}>
                    <option>red</option>
                    <option>blue</option>
                </Input>
            </FormGroup>
        );

        const positionForm = (
            <FormGroup>
                <Label>Position</Label>
                <Input type={"select"} id={"position"} value={this.state.position} onChange={this.handleChange}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </Input>
            </FormGroup>
        );

        const MatchNumberForm = (
            <LabeledInput id={"matchNumber"} type={"number"} onChange={this.handleChange} value={this.state.matchNumber} label={"Match Number"} />
        );

        const matchRows = this.state.teams.map((teamItem, index) => {
            return (
                <tr key = {index}>
                    <td><Link to={"/test-sr/" + (index+1)} >{index + 1}</Link></td>
                    <td><Link to={"/test-sr/" + (index+1)}>{teamItem['team_number']}</Link></td>
                    <td><Link to={'/test-sr/' + (index+1)}>{teamItem['nickname']}</Link></td>
                </tr>
            );
        });

        return (
            <div>
                <Form>
                    {allianceForm}
                    {positionForm}
                    {MatchNumberForm}
                </Form>
                {this.state.team != undefined ? `You are scouting Team ${this.state.team.team_number}, ${this.state.team.nickname}`: `Loading...`}
            </div>
        );
    }
}