import React from 'react';
import {FormGroup, Input, Label} from 'reactstrap'
import NumericInput from 'react-numeric-input';
import {LabeledInput} from '../form.js'

export const NumericStepper = (props) => {
    return (
      <div>
        <button onClick={e => {props.onChange(props.value+props.step)}}>+</button>
        <input className="num-step" type="number" min={props.min} max={props.max}
                      step={props.step} value={props.value}/>
        <button onClick={e => {props.onChange(props.value-props.step)}}>-</button>
      </div>

    )
};
