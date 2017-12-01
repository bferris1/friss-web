import React from 'react';
import { Button } from 'reactstrap';
import Auth from '../AuthCtrl';

export default class TeamList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            eventObj:props.eventObj,
            teamKeys: [],
            teams: []
        };
    }

    componentDidMount() {

        Auth.get('/api/event/' + this.props.eventObj['_id'] +'/scoutingReports').then((reportsResponse) => {
            if (reportsResponse.success) {
                return reportsResponse.reports;
            } else {
                alert('Unable to fetch scouting reports for event.')
            }
        }).then((json) => {
            json.forEach((report) => {

                if (this.state.teamKeys.indexOf(report.teamKey) > 0) {
                    return;
                }

                // Update state team keys.
                let teamKeys = this.state.teamKeys;
                teamKeys.push(report.teamKey);
                this.setState({
                    teamKeys: teamKeys
                });

            });
        });
    }

    render() {

        const teamList = this.state.teamKeys.map((teamKey, index) => {
            return (
                <tr key={index}>
                    <td><Button onClick={() => this.props.teamSelected(this.state.teamKeys[index])}>{teamKey}</Button></td>
                </tr>
            );
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>Team Key</th>
                    </tr>
                </thead>
                <tbody>
                    {teamList}
                </tbody>
            </table>
        );


    }

}