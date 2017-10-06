import React, {Component} from 'react';
import {Table, Button} from 'reactstrap';
import MetricForm from './MetricForm';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class GameDetails extends Component {

    constructor(props) {
        super(props);

        // TODO: Remove sample metric.
        // Sample metric.
        const metric1 = {name: "Test", type: "String", category: "Autonomous"};

        this.state = {
            newMetric: {},
            modal: false,
            // showsAddMetricForm: false,
            metrics: [metric1] // TODO: Connect to backend.
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

    handleAddMetric(metric){

        if (metric) {
            let metrics = this.state.metrics;
            metrics.push(metric);
            this.setState({
                metrics: metrics
            });
        }
        this.toggle();
    }

    handleDeleteMetric(metric){
        // eslint-disable-next-line
        let del = confirm("Are you sure you want to remove the metric \"" + metric.name + "\" from the game?");
        if(!del){
            return;
        }
        let metrics = this.state.metrics.filter(function (candidate) {
            return candidate !== metric;
        });
        this.setState({metrics:metrics});
        //this.toggle();
    }


    handleClick(e) {
        e.preventDefault();
        // this.setState({ showsAddMetricForm: true });
        this.toggle();
    }

    handleDeleteMetric

    render() {
        const addMetricModal = (
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Add New Metric</ModalHeader>
                <ModalBody>
                    <MetricForm onSubmit={this.handleAddMetric}/>
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
                            <th>Delete Metric</th>
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
