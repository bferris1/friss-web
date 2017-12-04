import React from 'react';
import {Button} from 'reactstrap';
import Auth from '../AuthCtrl';

export default class TeamList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            eventObj:props.eventObj,
            teamKeys: [],
            teams: [],
            selectedTeam: null
        };

        this.sortData = this.sortData.bind(this);
    }

    componentDidMount() {

        Auth.get('/api/event/' + this.props.eventObj['_id'] +'/scoutingReports').then((reportsResponse) => {
            if (reportsResponse.success) {
                return reportsResponse.reports;
            } else {
                alert('Unable to fetch scouting reports for event.')
            }
        }).then((json) => {
            let teamKeys = [];
            json.forEach((report) => {

                if (teamKeys.indexOf(report.teamKey) === -1) {
                    teamKeys.push(report.teamKey);
                }

            });
            // Update state team keys.
            this.setState({
                teamKeys: teamKeys
            });
        });
    }

    sortData() {
        let teamKeysCopy = this.state.teamKeys;
        teamKeysCopy.sort();
        this.setState({
            teamKeys: teamKeysCopy
        });
    }

    render() {

        const teamList = this.state.teamKeys.map((teamKey, index) => {

            const buttonColor = teamKey === this.state.selectedTeam ? "primary" : "secondary";

            return (
                <tr key={index}>
                    <td><Button color={buttonColor} onClick={() => {this.state.selectedTeam = this.state.teamKeys[index]; this.props.teamSelected(this.state.teamKeys[index])}}>{teamKey}</Button></td>
                </tr>
            );
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th><Button color={"link"} onClick={this.sortData}>Team Key</Button></th>
                    </tr>
                </thead>
                <tbody>
                    {teamList}
                </tbody>
            </table>
        );


    }

}