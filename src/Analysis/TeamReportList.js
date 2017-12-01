import React from 'react';
import Auth from '../AuthCtrl';

export default class TeamReportList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            event:null,
            teamIDs: [],
            teams: []
        };
    }

    /*
     * UX Flow:
     * Event Page ---select event--> Teams --select team--> Metrics --select Metric--> View Raw Data.
     */
    componentDidMount() {
        // Get report IDs from the reports.
        let x = ['5a19b9e615ae0cc6f9b3656a'];
        //TODO: for (let i = 0; i < this.state.event.scoutingReports.length(); i++) {
        for (let i = 0; i < x.length; i++) {
            // Get current report ID.
            const reportId = x[i];
            // Get team ID from the report.
            Auth.get('/api/scouting/' + reportId).then((response) => {
                if (response.success) {
                    console.log('Scouting Report Response: ');
                    console.log(response);
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
                            console.log('Team Response: ');
                            console.log(teamResponse);
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
        return (
            <p>Hee</p>
        );


    }

}