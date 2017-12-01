import React from 'react';
import Auth from '../AuthCtrl';

export default class MetricList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            event: null,
            metrics: []
        }
    }

    componentDidMount() {
        // Get game ID from event.
        //TODO: Auth.get('/api/game/' + this.state.event.game).then((gameResponse) => {
        Auth.get('/api/games/5a19b9f115ae0cc6f9b3656b').then((gameResponse) => {
            console.log(gameResponse);
            if (gameResponse.success) {
                return gameResponse;
            } else {
                alert('Failed to get game data.')
            }
        }).then((gameJson) => {
            // Get metrics from game.
            this.setState({
                metrics: gameJson.game.metrics
            });
        });
    }

    render() {
        let metricList = [];
        if (this.state.metrics) {
            metricList = this.state.metrics.map((index, metric) => {
                console.log(metric);
                return(
                    <tr key={index}>{metric.name}</tr>
                );
            });
        }

        return (
            <table>
                <tbody>
                    {metricList}
                </tbody>
            </table>
        );
    }

}