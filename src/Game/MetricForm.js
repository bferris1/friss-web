import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class MetricForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            category: "Autonomous Mode",
            type: "Integer"
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.onSubmit(this.state);
    }

    render() {
        return (
            <Form onSubmit={(e)=>{e.preventDefault(); this.props.onSubmit(this.state)}}>
                <FormGroup>
                    <Label for="name">Metric Name</Label>
                    <Input id="name" onInput={this.handleChange}/>
                </FormGroup>
                <FormGroup>
                    <Label for="category">Metric Category</Label>
                    <Input type="select" id="category" onChange={this.handleChange}>
                        <option>Autonomous Mode</option>
                        <option>Tele-operated Mode</option>
                        <option>Add New Category</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="type">Metric Category</Label>
                    <Input type="select" id="type" onChange={this.handleChange}>
                        <option>Integer</option>
                        <option>Double</option>
                        <option>String</option>
                    </Input>
                </FormGroup>
                <Input type="submit"/>
            </Form>
        )
    }
}