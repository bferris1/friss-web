import React, {Component} from 'react';
import {Table, Button} from 'reactstrap';
import MetricForm from './MetricForm';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class GameDetails extends Component {

    constructor() {
        super();

        const metric1 = {name: "Test", type: "String", category: "Autonomous"};

        this.state = {
            modal: false,
            showsAddMetricForm: false,
            metrics: [metric1] // TODO: Connect to backend.
        };

        this.handleClick = this.handleClick.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
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
                    <MetricForm/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
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
