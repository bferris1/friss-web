import React from 'react';
import Auth from '../AuthCtrl';
import DataList from './DataList';
import TeamList from './TeamList';
import MetricList from './MetricList';

export default class Analysis extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            // Get event ID from URL.
            eventID: this.props.match.params.eventId,
            eventObj: null,
            selectedMetric: null,
            selectedTeamKey: null,
            matches: [],
            metricValues: [],
            scoutingReports: []
        };

        this.teamSelected = this.teamSelected.bind(this);
        this.metricSelected = this.metricSelected.bind(this);
        this.updateDataList = this.updateDataList.bind(this);
        this.getScoutingReports = this.getScoutingReports.bind(this);
    }

    componentDidMount() {

        // Fetch event data from event ID.
        Auth.get('/api/event/' + this.state.eventID).then((eventResponse) => {
            if (eventResponse.success) {
                return eventResponse.event;
            } else {
                alert('Error fetching event data from backend.')
            }
        }).then((eventJson) => {
            // Update loaded event.
            this.setState({
                eventObj: eventJson
            });
        });
        this.getScoutingReports();
    }

    getScoutingReports(){
        Auth.get('/api/event/' + this.state.eventID +'/scoutingReports').then((reportsResponse) => {
            console.log(reportsResponse);
            if (reportsResponse.success) {
                return reportsResponse.reports;
            } else {
                alert('Unable to fetch scouting reports for event.')
            }
        }).then(res => {
            this.setState({
                scoutingReports: res
            })

        })
    }

    updateDataList(){
        if (!this.state.selectedTeamKey || !this.state.selectedMetric) return;

        const selectedTeamKey = this.state.selectedTeamKey;
        const selectedMetric = this.state.selectedMetric;
        const selectedEvent = this.state.eventObj;

        let matchNumbers = [];
        let metricValues = [];


        // Filter reports by selected team.
        this.state.scoutingReports.forEach((report) => {
            if (report.teamKey === selectedTeamKey) {
                matchNumbers.push(report.matchNumber);
                // Filter metrics by selected metric.
                for (let i = 0; i < report.metricData.length; i++) {
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
    }

    teamSelected(teamKey) {
        this.setState({
            selectedTeamKey: teamKey
        }, this.updateDataList);
    }

    metricSelected(metric) {
        this.setState({
            selectedMetric: metric
        }, this.updateDataList);
    }

    render() {


        let teamList, metricList, dataList, selectedView = null;

        if (this.state.eventObj) {
            teamList = (<TeamList scoutingReports={this.state.scoutingReports} eventObj={this.state.eventObj} teamSelected={this.teamSelected}/>);
            metricList = (<MetricList eventObj={this.state.eventObj} metricSelected={this.metricSelected}/>);
        }

        if (this.state.selectedTeamKey && this.state.selectedMetric) {
            dataList = (<DataList matches={this.state.matches} metricValues={this.state.metricValues}/>);
        }

        return (
            <div className="row">
                <div className="col-sm-6">
                    {teamList}
                    {metricList}
                    {selectedView}
                </div>
                <div className="col-sm-6">
                    <h2>Data:</h2>
                    {dataList}
                </div>

            </div>
        );
    }

}