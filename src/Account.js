import React, { Component } from 'react';
import {Row, Col, Label} from 'reactstrap';
import {AvForm, AvInput, AvGroup} from 'availity-reactstrap-validation';
import {PasswordInput, LabeledInput} from './form'

export default class Account extends Component{

    constructor(props){
        super(props);
        //dummy data
        this.state={firstName:'Ben',lastName:'Ferris',email:'me@domain.edu', password:""};
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        console.log("mounted")
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    render(){
        return (<div>
                <h1>Profile Page</h1>
                <p>You are logged in as {this.state.firstName} {this.state.lastName}</p>
                <AvForm>
                    <Row>
                        <Col sm={6}>
                            <LabeledInput name="firstName" label={"First Name"} value={this.state.firstName} onChange={this.handleChange}/>
                    </Col>
                        <Col sm={6}>
                            <LabeledInput name="lastName" label={"Last Name"} value={this.state.lastName} onChange={this.handleChange} />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <AvGroup>
                                <Label for="email">Email Address</Label>
                                <AvInput name="email" id="email" onChange={this.handleChange} value={this.state.email} validate={{email:true}} placeholder="Email"/>
                            </AvGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <PasswordInput value={this.state.password} onChange={this.handleChange}/>
                        </Col>
                    </Row>
                </AvForm>
            </div>
        )
    }
}

