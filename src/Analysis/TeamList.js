import React from 'react';
import { Button } from 'reactstrap';
import Auth from '../AuthCtrl';

export default class TeamList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            eventObj:props.eventObj,
            teamIDs: [],
            teams: []
        };
    }

    componentDidMount() {

        for (let i = 0; i < this.props.eventObj.scoutingReports.length; i++) {
            // Get current report ID.
            const reportId = this.props.eventObj.scoutingReports[i];
            // Get team ID from the report.
            Auth.get('/api/scouting/' + reportId).then((response) => {
                if (response.success) {
                    return response;
                }
            }).then((json) => {
                // Check if team has already been added.
                if (this.state.teamIDs.indexOf(json.teamId) < 0) {
                    return;
                } else {
                    // Add team ID to state.teamIDs.
                    let teamIDs = this.state.teamIDs;
                    teamIDs.push(json.teamId);
                    this.setState({
                        teamIDs: teamIDs
                    });
                    // Fetch team data from ID.
                    Auth.get('/api/team/' + json.teamId).then((teamResponse) => {
                        if (teamResponse.success) {
                            return teamResponse;
                        }
                    }).then((teamJson) => {
                        // Add team to state.teams.
                        let teams = this.state.teams;
                        teams.push(teamJson);
                        this.setState({
                            teams: teams
                        });
                    });
                }
            });

        }

    }

    render() {

        const teamList = this.state.teams.map((team, index) => {
            return (
                <tr key={index}>
                    <td><Button onClick={() => this.props.teamSelected(this.state.teams[index])}>{team.name}</Button></td>
                </tr>
            );
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Team Name</th>
                    </tr>
                </thead>
                <tbody>
                    {teamList}
                </tbody>
            </table>
        );


    }

}