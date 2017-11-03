import React from 'react';
import {Form, FormGroup, Input, Label, Table} from 'reactstrap';
import {Link} from 'react-router-dom';

export default class Matches extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            alliance: 'red',
            position: 1,
            matches: [],
            teams: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.updateData = this.updateData.bind(this);
    }

    componentDidMount(){
        this.updateData();
    }

    handleChange(e) {
        this.setState({[e.target.id]: e.target.value});
        this.setState({teams:[]});
        this.updateData();

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
            var teams = this.state.teams;

            json.forEach((matchItem) =>  {
                let teamKey = matchItem['alliances'][this.state.alliance]['team_keys'][this.state.position - 1];
                let TEAM_API_URL = 'https://www.thebluealliance.com/api/v3/team/' + teamKey;
                fetch(TEAM_API_URL, requestOptions).then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        alert('Unable to fetch match data from TheBlueAlliance API.');
                    }
                }).then((team_json) => {
                    teams.push(team_json);
                    this.setState({
                        teams: teams
                    });
                });
            });
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

        var matchRows = this.state.teams.map((teamItem, index) => {
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
                </Form>
                <Table>
                    <thead>
                    <tr>
                        <th>Match #</th>
                        <th>Team #</th>
                        <th>Team Nickname</th>
                    </tr>
                    </thead>
                    <tbody>
                    {matchRows}
                    </tbody>
                </Table>
            </div>
        );
    }
}