import React from 'react';
import Auth from '../AuthCtrl';

export default class DataList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            matches: [],
            metricValues: []
        };
    }

    componentDidMount() {

        let selectedTeamKey = this.props.selectedTeamKey;
        let selectedMetricKey = this.props.selectedMetricKey;
        let selectedEvent = this.props.selectedEvent;

        let matchNumbers = [];
        let metricValues = [];

        Auth.get('/api/event/' + this.props.selectedEvent['_id'] +'/scoutingReports').then((reportsResponse) => {
            return reportsResponse.reports;
        }).then((reports) => {
            console.log(reports);
            reports.forEach((report) => {
                if (report.teamKey === selectedTeamKey) {
                    matchNumbers.push(report.matchNumber);
                    for (var i = 0; i < report.metricData.length; i++) {
                        if (report.metricData.metric === selectedMetricKey) {
                            metricValues.push(report.metricData.metricValue);
                        }
                    }
                }
            });
        });

        this.setState({
            matches: matchNumbers,
            metricValues: metricValues
        });


    }

    render() {

        let metricValuesList = [];
        if (this.state.metricValues) {
            for (let i = 0; i < this.state.metricValues.length; i++) {
                metricValuesList[i] = (
                    <tr>
                        <td>{this.state.matches[i]}</td>
                        <td>{this.state.metricValues[i]}</td>
                    </tr>
                );
            }
        }

        return(
            <table>
                <thead>
                    <tr>
                        <th>Match Number</th>
                        <th>Metric Value</th>
                    </tr>
                </thead>
                <tbody>
                    {metricValuesList}
                </tbody>
            </table>
        );


    }
}