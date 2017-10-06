import React, {Component} from 'react';
import {Table, Button} from 'reactstrap';
import MetricForm from './MetricForm';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

export default class GameDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            metric: {name: "", category: "Autonomous Mode", type: "Integer"},
            selectedIndex: -1,
            modal: false,
            metrics: [] // TODO: Connect to backend.
        };

        this.handleClick = this.handleClick.bind(this);
        this.handleAddMetric = this.handleAddMetric.bind(this);
        this.handleDeleteMetric = this.handleDeleteMetric.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleAddMetric(metric) {
        // Handle Add.
        if (this.state.selectedIndex === -1) {
            let metrics = this.state.metrics;
            metrics.push(metric);
            this.setState({
                metrics: metrics
            });
        }
        // Handle Edit.
        else {
            let metrics = this.state.metrics;
            metrics[this.state.selectedIndex] = metric;
            this.setState({
                metrics: metrics,
                selectedIndex: -1
            });
        }
        this.toggle();
    }

    handleDeleteMetric(metric) {
        // eslint-disable-next-line
        let del = confirm("Are you sure you want to remove the metric \"" + metric.name + "\" from the game?");
        if(!del){
            return;
        }
        let metrics = this.state.metrics.filter(function (candidate) {
            return candidate !== metric;
        });
        this.setState({metrics:metrics});
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({
            metric: {name: "", category: "Autonomous Mode", type: "Integer"}
        });
        this.toggle();
    }

    render() {
        const addMetricModal = (
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Add/Edit Metric</ModalHeader>
                <ModalBody>
                    <MetricForm onSubmit={this.handleAddMetric} metric={this.state.metric}/>
                </ModalBody>
            </Modal>
        );

        const addMetricButton = <Button color="link" onClick={this.handleClick}>Add Metric</Button>;
        const metricRows = this.state.metrics.map((metric, index) =>
            <tr key={index}>
                <td>
                    {metric.name}
                </td>
                <td>
                    {metric.category}
                </td>
                <td>
                    {metric.type}
                </td>
                <td>
                    <Button onClick={()=>{this.toggle(); this.setState({metric:this.state.metrics[index], selectedIndex: index})}}>Edit</Button>
                    <Button color="danger" onClick={()=>{this.handleDeleteMetric(metric)}}>Delete</Button>
                </td>
            </tr>
        );
        return (
            <div>
                {addMetricModal}
                {addMetricButton}
                <Table>
                    <thead>
                        <tr>
                            <th>Metric Name</th>
                            <th>Metric Category</th>
                            <th>Metric Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {metricRows}
                    </tbody>
                </Table>
            </div>
        )
    }
}
