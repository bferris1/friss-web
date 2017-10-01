import React, {Component} from 'react';
import './Login.css';
import {Row, Col, Button} from 'reactstrap';
import {EmailInput, PasswordInput, Form} from './form';

export default class Login extends Component {

    constructor(props){
        super (props);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {};

    }

    handleLogin(formState){
        console.log(formState);
    }

    render() {
        return (
            <Row>
                <Col sm={{size:6, offset:3}}>
                    <img className="img-fluid mx-auto d-block" src="https://i.imgur.com/WawaXKU.png" alt="FRISS"/>
                    <Form onSubmit={this.handleLogin}>
                        <EmailInput value={this.state.email}/>
                        <PasswordInput value={this.state.password}/>
                        <Button type={"submit"} block={true} color="primary">Log In</Button>
                        <div className="links-container">
                            <a href="/signup">Sign Up</a>
                            <a href="/forgot">Forgot Password?</a>
                        </div>
                    </Form>
                </Col>
            </Row>
        )
    }
}