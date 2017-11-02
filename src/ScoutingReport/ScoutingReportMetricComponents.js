import React from 'react';
import {FormGroup, Input, Label} from 'reactstrap';
import NumericInput from 'react-numeric-input';

import {LabeledInput} from '../form.js';

export const NumericStepper = (props) => {
    return (
      <div style={{marginTop:'15px'}}>
        <p style={{marginBottom:'5px'}}>{props.name}</p>
        <button onClick={e => {props.onChange(props.value-props.step)}}>-</button>
        <input className="num-step" type="number" min={props.min} max={props.max}
                      step={props.step} value={props.value}/>
        <button onClick={e => {props.onChange(props.value+props.step)}}>+</button>

      </div>
    );
}

export const CheckboxMetric = (props) => {
    return (
        <div>
            <label style={{marginBottom:'5px',marginRight:'5px'}}>{props.name}</label>
            <input type="checkbox" checked={props.value} onChange={props.onChange}></input>
        </div>
    );
}

export const RadioOptionMetric = (props) => {
  return (
    <div>
        <FormGroup check>
          <Label check>
            <Input type="radio" name={props.name} />{' '}
            {props.option}
          </Label>
        </FormGroup>
    </div>
  );
}
