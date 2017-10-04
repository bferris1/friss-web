import React, {Component} from 'react';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class MetricForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: null,
            category: null,
            type: null,
            isValidMetric: false
        };

    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="name">Metric Name</Label>
                    <Input id="name" />
                </FormGroup>
                <FormGroup>
                    <Label for="category">Metric Category</Label>
                    <Input type="select" name="select" id="category">
                        <option>Autonomous Mode</option>
                        <option>Tele-operated Mode</option>
                        <option>Add New Category</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="type">Metric Category</Label>
                    <Input type="select" name="select" id="type">
                        <option>Integer</option>
                        <option>Double</option>
                        <option>String</option>
                    </Input>
                </FormGroup>
            </Form>
        )
    }
}