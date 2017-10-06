import React from 'react';
import {AvGroup, AvInput, AvFeedback} from 'availity-reactstrap-validation'
import {FormGroup, Input, Label} from 'reactstrap'

export const EmailInput = (props) => {
    return (
    <AvGroup>
        <Label for="email">Email Address</Label>
        <AvInput name="email" id="email" onChange={props.onChange} value={props.value} validate={{email:true}} placeholder="Email"/>
    </AvGroup>
    )
};

export const PasswordInput = (props) =>{

    return(
        <AvGroup>
            <Label for="password">Password</Label>
            <AvInput name="password" type="password" id="password" onChange={props.onChange} value={props.value} placeholder="Password" minLength={8} />
            <AvFeedback>Password must be at least 8 characters.</AvFeedback>
        </AvGroup>
    )
};

export const LabeledInput = (props) => {
    return (
        <FormGroup >
            <Label>{props.label}</Label>
            <Input name={props.name} type={props.type} id={props.id}
                   value={props.value} onChange={props.onChange}
                   placeholder={props.label}/>
        </FormGroup>
    )
};
