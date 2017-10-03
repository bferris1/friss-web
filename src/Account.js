import React, { Component } from 'react';
import {Row, Col, Button} from 'reactstrap';
import {AvForm} from 'availity-reactstrap-validation';
import {PasswordInput, LabeledInput, EmailInput} from './form'

export default class Account extends Component{

    constructor(props){
        super(props);
        //dummy data
        this.state={firstName:'First Name',lastName:'Last Name',email:'email@domain.edu', password:""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        //fetch account information to populate form
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    handleSubmit(){
        console.log(this.state);
    }

    render(){
        return (<div>
                <h1>Your Account</h1>
                <p>You are logged in as {this.state.firstName} {this.state.lastName}</p>
                <AvForm onSubmit={this.handleSubmit}>
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
                            <EmailInput value={this.state.email} onChange={this.handleChange}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={12}>
                            <PasswordInput value={this.state.password} onChange={this.handleChange}/>
                        </Col>
                    </Row>
                    <Button type={"submit"} block={true} color={"primary"}>Save Changes</Button>
                </AvForm>
            </div>
        )
    }
}

