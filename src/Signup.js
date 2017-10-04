import React, { Component } from 'react';
import {Row, Col, Button} from 'reactstrap';
import {AvForm} from 'availity-reactstrap-validation';
import {Link} from 'react-router-dom';
import {EmailInput, PasswordInput, LabeledInput} from "./form";

export default class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {firstName:"", lastName:""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    handleSubmit(e){
        console.log(this.state);

        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        fetch("/api/auth/register",
            {
                method: "POST",
                headers:headers,
                body: JSON.stringify(this.state)
            })
            .then((response)=>{return response.json()})
            .then(console.log)
    }

    render(){
        return (
            <Row>
                <Col sm={{size:6, offset:3}}>
                    <img className="img-fluid mx-auto d-block" src="https://i.imgur.com/WawaXKU.png" alt="FRISS"/>
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
                                <EmailInput value={this.state.email} onChange={this.handleChange}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <PasswordInput value={this.state.password} onChange={this.handleChange}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <Button type={"submit"} onClick={this.handleSubmit} block={true} color="primary">Sign Up</Button>
                            </Col>
                        </Row>
                    </AvForm>
                    <Link to={"/login"}>Log In</Link>
                </Col>
            </Row>
        )
    }
}