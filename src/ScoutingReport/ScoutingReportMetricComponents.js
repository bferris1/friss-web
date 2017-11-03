import React from 'react';
import {FormGroup, Input, Label} from 'reactstrap';

import {LabeledInput} from '../form.js';

export const NumericStepper = (props) => {
    return (
      <div style={{marginTop:'15px'}}>
        <p style={{marginBottom:'5px'}}>{props.name}</p>
        <button onClick={e => {e.preventDefault(); props.onChange(props.value-props.step)}}>-</button>
        <input className="num-step" type="number" min={props.min} max={props.max}
                      step={props.step} value={props.value}/>
        <button onClick={e => {e.preventDefault(); props.onChange(props.value+props.step)}}>+</button>

      </div>
    );
};

export const CheckboxMetric = (props) => {
    return (
        <div>
            <label style={{marginBottom:'5px',marginRight:'5px'}}>{props.name}</label>
            <input type="checkbox" checked={props.value} onChange={props.onChange}></input>
        </div>
    );
};

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
