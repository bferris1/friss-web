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
        };

        this.teamSelected = this.teamSelected.bind(this);
        this.metricSelected = this.metricSelected.bind(this);
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
    }

    teamSelected(teamKey) {
        this.setState({
            selectedTeamKey: teamKey
        });
    }

    metricSelected(metric) {
        this.setState({
            selectedMetric: metric
        });
    }

    render() {

        let teamList, metricList, dataList, selectedView = null;

        if (this.state.eventObj) {
            teamList = (<TeamList eventObj={this.state.eventObj} teamSelected={this.teamSelected}/>);
            metricList = (<MetricList eventObj={this.state.eventObj} metricSelected={this.metricSelected}/>);
        }

        if (this.state.selectedTeamKey && this.state.selectedMetric) {
            selectedView = (
                <div>
                    Selected Team: {this.state.selectedTeamKey}
                    <br />
                    Selected Metric: {this.state.selectedMetric.name}
                </div>
            );
            dataList = (<DataList selectedEvent={this.state.eventObj} selectedTeamKey={this.state.selectedTeamKey} selectedMetric={this.state.selectedMetric}/>);
        }

        return (
            <div>
                {teamList}
                {metricList}
                {selectedView}
                {dataList}
            </div>
        );
    }

}