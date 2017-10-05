import React, {Component} from 'react';
import {Table, Button} from 'reactstrap';
import MetricForm from './MetricForm';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class GameDetails extends Component {

    constructor() {
        super();

        // TODO: Remove sample metric.
        // Sample metric.
        const metric1 = {name: "Test", type: "String", category: "Autonomous"};

        this.state = {
            newMetric: {},
            modal: false,
            showsAddMetricForm: false,
            metrics: [metric1] // TODO: Connect to backend.
        };

        this.handleClick = this.handleClick.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle(metric) {
        // TODO: Add metric to table.
        /*
        if (metric) {
            let metrics = this.state.metrics;
            metrics.append(metric);
            this.setState({
                metrics: metrics
            });
        }*/

        this.setState({
            modal: !this.state.modal
        });
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({ showsAddMetricForm: true });
        this.toggle()
    }

    render() {
        const addMetricModal = (
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Add New Metric</ModalHeader>
                <ModalBody>
                    <MetricForm submitHandler={() => this.toggle}/>
                </ModalBody>
            </Modal>
        );
        const addMetricButton = <Button color="link" onClick={this.handleClick}>Add Metric</Button>;
        const metricRows = this.state.metrics.map((metric) =>
            <tr>
                <td>
                    {metric.name}
                </td>
                <td>
                    {metric.category}
                </td>
                <td>
                    {metric.type}
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
