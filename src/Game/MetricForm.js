import React, {Component} from 'react';
import {Form, Input} from 'reactstrap';
import {LabeledInput} from '../form'
import RadioOptionForm from "./RadioOptionForm";


export default class MetricForm extends Component {

    constructor(props) {
        super(props);

        if (props.metric === null){
            this.state = {
                name:'',
                section:'Autonomous Mode',
                type:'Integer',
                maximumValue:'',
                minimumValue:'',
                defaultValue:'',
                incrementStep:undefined,
                radioOptions: []
            }
        } else {
            this.state = props.metric;
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    handleRadioChange(radioOptions) {
        this.setState({radioOptions});
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
                              type={"number"} />
                <LabeledInput label={"Minimum value"}
                              name={"minimumValue"}
                              value={this.state.minimumValue}
                              onChange={this.handleChange}
                              type={"number"} />
                <LabeledInput label={"Maximum value"} name={"maximumValue"}
                              onChange={this.handleChange}
                              value={this.state.maximumValue} type={"number"} />
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
        } else if(this.state.type === "Radio"){
            extraForm = <RadioOptionForm options={this.state.radioOptions} onChange={this.handleRadioChange}/>
        }

        return (
            <Form onSubmit={(e)=>{e.preventDefault(); this.props.onSubmit(this.state)}}>
                <LabeledInput name={"name"} label={"Metric Name"} type={"text"} value={this.state.name} onChange={this.handleChange}/>
                <LabeledInput name={"section"} type={"select"} value={this.state.section} label={"Metric Category"} onChange={this.handleChange}>
                    <option>Autonomous Mode</option>
                    <option>Tele-operated Mode</option>
                </LabeledInput>
                <LabeledInput type={"select"} name={"type"} label={"Metric Type"} value={this.state.type} onChange={this.handleChange}>
                    <option>Integer</option>
                    <option>Double</option>
                    {/*<option>Boolean</option>*/}
                    {/*<option>String</option>*/}
                    <option>Time</option>
                    <option>Radio</option>
                </LabeledInput>
                {extraForm}
                <br/>
                <Input type="submit"/>
            </Form>
        )
    }
}
