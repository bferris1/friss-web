import React from 'react';
import {FormGroup, Input, Label} from 'reactstrap';

import {LabeledInput} from '../form.js';

export const NumericStepper = (props) => {
    let inc = function () {
        let newVal = Number(props.value);
        if (props.step){
            newVal += props.step;
        }
        if (props.max && newVal <= props.max)
            props.onChange(newVal);

    };

    let dec = function () {
        let newVal = props.value;
        if (props.step){
            newVal -= props.step;
        }
        if (props.min && newVal >= props.min)
            props.onChange(newVal);
    };

    return (
        <div className={"my-2"}>
            <p className={"mb-2"}>{props.name}</p>
            <div className={"d-flex justify-content-start"}>
                <button className={"btn btn-danger"} onClick={e => {e.preventDefault(); dec()}}>-</button>
                <Input className="num-step mx-2" type="number" min={props.min} max={props.max}
                       step={props.step} value={props.value}/>
                <button className={"btn btn-success"} onClick={e => {e.preventDefault(); inc()}}>+</button>
            </div>
        </div>
    );
};

export const CheckboxMetric = (props) => {
    return (
        <div>
            <label style={{marginBottom:'5px',marginRight:'5px'}}>{props.name}</label>
            <Input type="checkbox" checked={props.value} onChange={props.onChange}/>
        </div>
    );
};

export const RadioOptionMetric = (props) => {
    return (
        <div>
            <FormGroup check>
                <Label check>
                    <Input type="radio" value={props.option} checked={props.checked} onChange={props.onChange} name={props.name} />{' '}
                    {props.option}
                </Label>
            </FormGroup>
        </div>
    );
};

export const TextboxMetric = (props) => {
    return (
        <div>
            <LabeledInput label={props.name} name={props.name}
                          value={props.value} onChange={props.onChange}
                          type={"textarea"}
            />
        </div>
    );
};
