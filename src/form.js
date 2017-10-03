import React from 'react';
import {AvGroup, AvInput, AvFeedback, AvForm} from 'availity-reactstrap-validation'
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
            <Input name={props.name} type={props.type}
                   value={props.value} onChange={props.onChange}
                   placeholder={props.label}/>
        </FormGroup>
    )
};

//this is experimental and likely needs some changes if we're going to use it
export class Form extends React.Component {
    constructor(props){
        super(props);
        this.renderChildren = this.renderChildren.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    renderChildren(){
        return React.Children.map(this.props.children, child =>{
            return React.cloneElement(child, {onChange: this.handleChange});
        });
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(){
        this.props.onSubmit(this.state);
    }

    render(){
        return (
            <AvForm onSubmit={this.handleSubmit}>
                {this.renderChildren()}
            </AvForm>
        );
    }
}