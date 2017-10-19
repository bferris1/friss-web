import React, {Component} from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import {LabeledInput} from '../form'


export default class MetricForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: props.metric.name,
            category: props.metric.category,
            type: props.metric.type,
            options: [{ name: '' }],
        };

        this.handleChange = this.handleChange.bind(this);
        this.resetOptions = this.resetOptions.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.id]: e.target.value});
        this.resetOptions();
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.onSubmit(this.state);
    }

    handleOptionNameChange = (idx) => (evt) => {
      const newOptions = this.state.options.map((option, sidx) => {
        if (idx !== sidx) return option;
        return { ...option, name: evt.target.value };
      });

      this.setState({ options: newOptions });
    }

    handleAddOption = () => {
      this.setState({
        options: this.state.options.concat([{ name: '' }])
      });
    }

    handleRemoveOption = (idx) => () => {
      this.setState({
        options: this.state.options.filter((s, sidx) => idx !== sidx)
      });
    }

    resetOptions(){
      this.setState({
        options: [{ name: '' }]
      });
    }

    render() {
      let extraForm = null;
      const numberForm = (
        <div>
          <LabeledInput label={"Default value"} name={"defVal"} id={"defVal"} type={"number"} />
          <LabeledInput label={"Minimum value"} name={"minVal"} id={"minVal"} type={"number"} />
          <LabeledInput label={"Maximum value"} name={"maxVal"} id={"maxVal"} type={"number"} />
        </div>
      );
      const stringForm = (
        <div>
          <LabeledInput label={"Text Area Placeholder"} onChange={this.handleChange} name={"placeholder"} id={"placeholder"} type={"text"} />
        </div>
      );
      const stopwatchForm = (
        <div>
          <LabeledInput label={"Max Time (blank for no limit)"} name={"maxTime"} id={"maxTime"} type={"time"} />
        </div>
      );
      let checkBoxListForm = (
        <FormGroup>
          <Label for="options">options</Label>
          {this.state.options.map((option, idx) => (
            <div key={idx} className="checkboxList">
              <input
                type="text"
                placeholder={`Checkbox #${idx + 1} label`}
                value={option.name}
                onChange={this.handleOptionNameChange(idx)}
              />
              <button type="button" onClick={this.handleRemoveOption(idx)} className="small">-</button>
            </div>
          ))}
            <button type="button" onClick={this.handleAddOption} className="small">Add Checkbox</button>
        </FormGroup>
      )



      if(this.state.type === "Integer" || this.state.type === "Double"){
        extraForm = numberForm;
      }
      else if(this.state.type === "String"){
        extraForm = stringForm;
      }
      else if(this.state.type === "Stopwatch"){
        extraForm = stopwatchForm;
      }
      else if(this.state.type === "Checkbox"){
        extraForm = checkBoxListForm;
      }

        return (
            <Form onSubmit={(e)=>{e.preventDefault(); this.props.onSubmit(this.state)}}>
                <LabeledInput name={"name"} id={"name"} label={"Metric Name"} type={"text"} value={this.state.name} onChange={this.handleChange}/>
                <LabeledInput name={"category"} type={"select"} value={this.state.category} label={"Metric Category"} id={"category"} onChange={this.handleChange}>
                    <option>Autonomous Mode</option>
                    <option>Tele-operated Mode</option>
                    <option>Add New Category</option>
                </LabeledInput>
                <LabeledInput type={"select"} label={"Metric Type"} value={this.state.type} id={"type"} onChange={this.handleChange}>
                    <option>Integer</option>
                    <option>Double</option>
                    <option>String</option>
                    <option>Stopwatch</option>
                    <option>Checkbox</option>
                </LabeledInput>
                {/*{extraForm}*/}
                <Input type="submit"/>
            </Form>
        )
    }
}
