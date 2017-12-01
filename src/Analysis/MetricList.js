import React from 'react';
import { Button } from 'reactstrap';
import Auth from '../AuthCtrl';

export default class MetricList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            metrics: [],
            sorted: false
        }
    }

    componentDidMount() {
        // Get game ID from event.
        Auth.get('/api/games/' + this.props.eventObj.game).then((gameResponse) => {
            if (gameResponse.success) {
                return gameResponse.game;
            } else {
                alert('Failed to get game data.')
            }
        }).then((gameJson) => {
            // Get metrics from game.
            this.setState({
                metrics: gameJson.metrics
            });
        });

        this.sortData = this.sortData.bind(this);
    }

    compareMetrics(a, b) {
        return a.name > b.name;
    }

    sortData() {
       let metricsCopy = this.state.metrics;
       metricsCopy.sort(this.compareMetrics);
       this.setState({
           metrics: metricsCopy,
           sorted: true
       });

    }

    render() {
        let metricList = null;
        if (this.state.metrics) {
            metricList = this.state.metrics.map((metric, index) => {
                return(
                    <tr key={index}>
                        <td><Button onClick={() => this.props.metricSelected(this.state.metrics[index])}>{metric.name}</Button></td>
                        <td>{metric.type}</td>
                    </tr>
                );
            });
        }

        return (
            <table>
                <thead>
                    <tr>
                        <th><Button color={"link"} onClick={this.sortData}>Metric Name</Button></th>
                        <th>Metric Type</th>
                    </tr>
                </thead>
                <tbody>
                    {metricList}
                </tbody>
            </table>
        );
    }

}