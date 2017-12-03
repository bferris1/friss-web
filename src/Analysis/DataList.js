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

        const selectedTeamKey = this.props.selectedTeamKey;
        const selectedMetric = this.props.selectedMetric;
        const selectedEvent = this.props.selectedEvent;

        let matchNumbers = [];
        let metricValues = [];

        // Get all reports for selected event.
        Auth.get('/api/event/' + selectedEvent['_id'] +'/scoutingReports').then((reportsResponse) => {
            return reportsResponse.reports;
        }).then((reports) => {
            // Filter reports by selected team.
            reports.forEach((report) => {
                if (report.teamKey === selectedTeamKey) {
                    matchNumbers.push(report.matchNumber);
                    // Filter metrics by selected metric.
                    for (var i = 0; i < report.metricData.length; i++) {
                        if (report.metricData[i].metric === selectedMetric['_id']) {
                            metricValues.push(report.metricData[i].metricValue);
                        }
                    }
                }
            });
            // Update with data.
            this.setState({
                matches: matchNumbers,
                metricValues: metricValues
            });
        });


    }

    render() {

        let metricValuesList = [];

        if (this.state.metricValues.length > 0) {

            for (let i = 0; i < this.state.metricValues.length; i++) {

                metricValuesList[i] = (
                    <tr key={i}>
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