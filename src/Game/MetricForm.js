import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {LabeledInput} from '../form'

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
      let extraForm = null;
      const numberForm = (
        <div>
          <LabeledInput label={"Default value"} name={"defVal"} id={"defVal"} type={"number"} />
          <LabeledInput label={"Minium value"} name={"minVal"} id={"minVal"} type={"number"} />
          <LabeledInput label={"Maxuim value"} name={"maxVal"} id={"maxVal"} type={"number"} />
        </div>
      );
      const stringForm = (
        <div>
          <LabeledInput label={"Text Area Placeholder"} name={"placeholder"} id={"placeholder"} type={"text"} />
        </div>
      );

      if(this.state.type === "Integer" || this.state.type === "Double"){
        extraForm = numberForm;
      }
      else if(this.state.type === "String"){
        extraForm = stringForm;
      }
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
                        <option>Stopwatch</option>
                        <option>CheckBox</option>

                    </Input>
                </FormGroup>
                {extraForm}
                <Input type="submit"/>
            </Form>
        )
    }
}
