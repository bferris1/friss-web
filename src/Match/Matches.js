import React from 'react';
import {Form, FormGroup, Input, Label} from 'reactstrap';

export default class Matches extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            alliance: 'Red',
            position: 1
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.id]: e.target.value});
    }

    render() {

        const allianceForm = (
            <FormGroup>
                <Label>Alliance</Label>
                <Input type={"select"} id={"alliance"} value={this.state.alliance} onChange={this.handleChange}>
                    <option>Red</option>
                    <option>Blue</option>
                </Input>
            </FormGroup>
        );

        const positionForm = (
            <FormGroup>
                <Label>Position</Label>
                <Input type={"select"} id={"position"} value={this.state.position} onChange={this.handleChange}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                </Input>
            </FormGroup>
        );

        return (
            <Form>
                {allianceForm}
                {positionForm}
            </Form>
        );
    }
}