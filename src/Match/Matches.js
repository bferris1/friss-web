import React from 'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import {LabeledInput} from "../form";
import Auth from '../AuthCtrl';
import ScoutingReportFrom from '../ScoutingReport/ScoutingReportForm';
import Alerts from "../Alerts";

export default class Matches extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            alliance: 'red',
            position: 1,
            matchNumber: 1,
            matches: [],
            teams: [],
            team: null,
            event: null,
            metrics: null
        }
        ;

        this.handleChange = this.handleChange.bind(this);
        this.updateData = this.updateData.bind(this);
        this.updateMatch = this.updateMatch.bind(this);
        this.updateEvent = this.updateEvent.bind(this);
        this.getMetrics = this.getMetrics.bind(this);
        this.handleSubmitScoutingReport = this.handleSubmitScoutingReport.bind(this);

    }

    componentDidMount(){
        this.updateEvent();
    }

    handleChange(e) {
        if (e.target.id === "matchNumber") {
            let newNumber = e.target.value;
            if (newNumber < 1 || newNumber > this.state.matches.length){
                return;
            }
        }
        this.setState({[e.target.id]: e.target.value});
        this.setState({team:undefined}, this.updateMatch);
    }

    updateEvent(){
        Auth.get(`/api/event/${this.props.match.params.eventId}`).then(res => {
            console.log(res);
            if (res.success){
                this.setState({event: res.event}, this.getMetrics);
            }
        })
    }

    getMetrics(){
        Auth.get(`/api/games/${this.state.event.game}`).then(res => {
            console.log(res);
            if (res.success){
                this.setState({metrics: res.game.metrics}, this.updateData);
            }
        })
    }

    updateMatch() {
        this.setState({team: null});

        if (!this.state.matchNumber) {
            this.setState({team:null});
            return;
        }
        if (!this.state.matches || this.state.matches.length < this.state.matchNumber) {
            alert("There are no matches!");
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
        let API_URL = `https://www.thebluealliance.com/api/v3/event/${this.state.event.eventKey}/matches`; // TODO: Get selected event.
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
            console.log(json);
            this.setState({matches:json}, this.updateMatch);
        });
    }

    handleSubmitScoutingReport(metricData){
        console.log(metricData);
        console.log(this.state);
        let toSubmit = {
            matchKey: this.state.matches[this.state.matchNumber].key,
            eventID: this.state.event._id,
            matchNumber: this.state.matchNumber,
            metricData: [{
                metric: '',
                metricValue: ''
            }],
            robotPos: this.state.alliance + this.state.position
        };

        toSubmit.metricData = metricData.map(currentData => ({metric:currentData.metric._id, metricValue: currentData.metricValue}))
        console.log(toSubmit);
        Auth.post('/api/report/scouting', toSubmit).then(res => {
            console.log(res);
            if (res.success){
                this.setState({alerts:{success:'Submitted Successfully'}})
            } else {
                this.setState({alerts:{danger:res.error}});
            }
            setTimeout(()=>{this.setState({alerts:{}})}, 5000);
        })
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

        return (
            <div>
                <h1>{!this.state.event || this.state.event.name}</h1>
                <Alerts alerts={this.state.alerts}/>
                <Form>
                    {allianceForm}
                    {positionForm}
                    {MatchNumberForm}
                    {this.state.team ? `You are scouting Team ${this.state.team.team_number}, ${this.state.team.nickname} for match ${this.state.matchNumber}`: `Loading...`}
                </Form>
                {!this.state.metrics || <ScoutingReportFrom
                    onSubmit={this.handleSubmitScoutingReport}
                    metrics={this.state.metrics}/>}
            </div>
        );
    }
}