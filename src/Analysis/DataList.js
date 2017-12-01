import React from 'react';

export default class DataList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            matches: [],
            metricValues: []
        };
    }

    componentDidMount() {

        // TODO: Get correct event, team, metric.

        let selectedEvent;
        let selectedTeam;
        let selectedMetricId;
        let selectedMetricName;

        let matchesData = [];
        let metricData = [];

        // Get all report IDs for event.
        let reportIDs = selectedEvent.scoutingReports;

        // Get all reports from event.
        reportIDs.forEach(function(reportID) {
            // Fetch report data.
            Auth.get('/api/scouting/' + reportID).then((reportResponse) => {
                if (reportResponse.success) {
                    return reportResponse;
                } else {
                    alert('Unable to fetch scouting report data.')
                }
            }).then((reportJson) => {
                // Get match number.
                matchesData.push(reportJson.matchNumber);
                // Get metric value for match number.
                for (let i = 0; i < reportJson.metricData.length; i++) {
                    if (reportJson.metricData[i].metric === selectedMetricId) {
                        metricData.push(reportJson.metricData[i].metricValue);
                    }
                }
                // Update state.
                this.setState({
                    matches: matchesData,
                    metricValues: metricData
                });
            });
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