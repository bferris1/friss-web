import React, {Component} from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import {LabeledInput} from '../form'


export default class MetricForm extends Component {

    constructor(props) {
        super(props);

        if (props.metric === null){
            this.state = {
                name:'',
                category:'Autonomous Mode',
                type:'Integer',
                maximumValue:'',
                minimumValue:'',
                defaultValue:'',
                incrementStep:undefined,
            }
        } else {
            this.state = props.metric;
        }

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
                <LabeledInput label={"Default value"}
                              value={this.state.defaultValue}
                              name={"defaultValue"}
                              onChange={this.handleChange}
                              id={"defaultValue"} type={"number"} />
                <LabeledInput label={"Minimum value"}
                              name={"minimumValue"}
                              value={this.state.minimumValue}
                              onChange={this.handleChange}
                              id={"minimumValue"} type={"number"} />
                <LabeledInput label={"Maximum value"} name={"maximumValue"}
                              onChange={this.handleChange}
                              value={this.state.maximumValue} id={"maximumValue"} type={"number"} />
            </div>
        );
        const stringForm = (
            <div>
                <LabeledInput label={"Text Area Placeholder"} onChange={this.handleChange}
                              name={"defaultValue"} value={this.state.defaultValue} type={"text"} />
            </div>
        );
        const stopwatchForm = (
            <div>
                <LabeledInput label={"Max Time in seconds (blank for no limit)"}
                              value={this.state.maximumValue}
                              onChange={this.handleChange}
                              name={"maximumValue"} type={"number"} />
            </div>
        );


        if(this.state.type === "Integer" || this.state.type === "Double"){
            extraForm = numberForm;
        }
        else if(this.state.type === "String"){
            extraForm = stringForm;
        }
        else if(this.state.type === "Time"){
            extraForm = stopwatchForm;
        }

        return (
            <Form onSubmit={(e)=>{e.preventDefault(); this.props.onSubmit(this.state)}}>
                <LabeledInput name={"name"} id={"name"} label={"Metric Name"} type={"text"} value={this.state.name} onChange={this.handleChange}/>
                <LabeledInput name={"category"} type={"select"} value={this.state.category} label={"Metric Category"} id={"category"} onChange={this.handleChange}>
                    <option>Autonomous Mode</option>
                    <option>Tele-operated Mode</option>
                </LabeledInput>
                <LabeledInput type={"select"} label={"Metric Type"} value={this.state.type} id={"type"} onChange={this.handleChange}>
                    <option>Integer</option>
                    <option>Double</option>
                    <option>String</option>
                    <option>Time</option>
                    {/*<option>Radio</option>*/}
                </LabeledInput>
                {extraForm}
                <Input type="submit"/>
            </Form>
        )
    }
}
