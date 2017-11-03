import React from 'react';
import {Form, FormGroup, Input, Label, Table} from 'reactstrap';
import Auth from '../AuthCtrl';

export default class Matches extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            event: null,
            eventObject: null,
            alliance: 'red',
            position: 1,
            matchesObjects: [],
            matches: [],
            teams: [],
            team_key_dict: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.refreshTeams = this.refreshTeams.bind(this);
    }

    componentDidMount() {
        var eventId = this.props.match.params.eventId;

        // Get event data from database.
        Auth.get('/api/event/' + eventId).then((response) => {
            if (response.success) {
                this.setState({
                    event: response.event
                });
            } else {
                alert('Unable to fetch event data for event ID' + eventId);
            }
        });

        // Get events from TheBlueAlliance.
        // TODO: Don't hard code the year.
        let EVENTS_API = 'https://www.thebluealliance.com/api/v3/events/2017/simple';
        let requestHeaders = new Headers();
        requestHeaders.append('X-TBA-Auth-Key', 'KRMfzG8uBUXabV2xdBE2NqyB5ntwAjUvr8RVL47fIdDWh2zKRr0vQjNNQfciVkm3'); // TODO: Use a secure file to store the key.
        let requestOptions = {
            method: 'GET',
            headers: requestHeaders
        };
        fetch(EVENTS_API, requestOptions).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert('Unable to fetch match data form TheBlueAlliance API.');
            }
        }).then((json) => {
            json.forEach((eventObj) => {
                if (eventObj.name === this.state.event.name) {
                    this.setState({eventObject: eventObj});
                }
            });
        }).then(() => {

            /*
             * My brain is melting.
             */

            // Get matches for event using event key.
            let MATCHES_API = 'https://www.thebluealliance.com/api/v3/event/' + this.state.eventObject.key + '/matches';
            fetch(MATCHES_API, requestOptions).then((response) => {
                console.log(response);
                if (response.ok) {
                    return response.json();
                } else {
                    alert('Unable to fetch match data form TheBlueAlliance API.');
                }
            }).then((json) => {
                let team_key_dict = this.state.team_key_dict;
                // Make a dictionary associating a team object with their key.
                let TEAM_KEYS_API = 'https://www.thebluealliance.com/api/v3/event/' + this.state.eventObject.key + '/keys';
                fetch(TEAM_KEYS_API, requestOptions).then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        alert('Unable to fetch team keys.')
                    }
                }).then((team_keys) => {
                    team_keys.forEach((team_key) => {
                        // Get data for each team.
                        let TEAM_API = 'https://www.thebluealliance.com/api/v3/team/' + team_key;
                        fetch(TEAM_API, requestOptions).then((response) => {
                            if (response.ok) {
                                team_key_dict[team_key] = response.json();
                            }
                            else {
                                alert('Unable to fetch team data.');
                            }
                        });

                    }).then(() => {
                        this.setState({
                            team_key_dict: team_key_dict
                        });
                    });
                });
            });
        }).then(() => {
            this.refreshTeams();
        });
    }

    refreshTeams() {
        var teams = this.state.teams;
        this.state.matchesObjects.forEach((matchObject) => {
            let team_key = matchObject.alliances[this.state.alliance].team_keys[this.state.position - 1];
            teams.push(this.state.team_key_dict[team_key]);
            this.setState({
                teams: teams
            });
        });
    }

    handleChange(e) {

        this.setState({[e.target.id]: e.target.value});

        this.refreshTeams();
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
                <tr key={index}>
                    <td><a href={''} onClick={this.handleChange} name='selectMatch'>{index + 1}</a></td>
                    <td><a href={''} onClick={this.handleChange} name='selectMatch'>{teamItem['team_number']}</a></td>
                    <td><a href={''} onClick={this.handleChange} name='selectMatch'>{teamItem['nickname']}</a></td>
                </tr>
            );
        });

        var header = null;
        if (this.state.eventObject) {
            header = (<h4>{this.state.eventObject.name}</h4>);
        }
        return (
            <div>
                {header}
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