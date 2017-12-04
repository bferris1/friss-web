import React, {Component} from 'react';
import {FormGroup, Input, Label} from "reactstrap";

export default class RadioOptionForm extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleDeleteOption = this.handleDeleteOption.bind(this);
    }



    handleChange(index, newValue) {
        let options = this.props.options.slice();
        options[index] = newValue;
        this.props.onChange(options);
    }

    handleAddOption(e){
        e.preventDefault();
        let options = this.props.options.slice();
        options.push("");
        this.props.onChange(options);

    }

    handleDeleteOption(index) {
        let options = this.props.options.slice();
        options.splice(index, 1);
        this.props.onChange(options);
    }


    render() {
        let optionInputs = this.props.options.map((value, index) => {
            return (
                <FormGroup key={index} >
                    <Label>{`Option ${index+1}`}</Label>
                    <div className={"d-flex justify-content-start"}>
                        <Input type={"text"}
                               className={"mr-2"}
                               value={this.props.options[index]}
                               onChange={e => {this.handleChange(index, e.target.value)}}
                        >
                        </Input>
                        <button onClick={e => {e.preventDefault(); this.handleDeleteOption(index)}} className={"align-self-center btn btn-danger"}><span className="oi oi-trash"/></button>

                    </div>
                </FormGroup>
            )
        });
        return (
            <div>
                {optionInputs}
                <button className={"btn btn-success"}
                        onClick={this.handleAddOption}>Add Option</button>
            </div>
        )
    }

}