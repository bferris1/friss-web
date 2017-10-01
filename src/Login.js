import React, {Component} from 'react';
import './Login.css';
import {Row, Col, Button} from 'reactstrap';
import {EmailInput, PasswordInput} from './form';
import {AvForm} from 'availity-reactstrap-validation';

export default class Login extends Component {

    constructor(props){
        super (props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {};

    }

    handleLogin(){
        console.log(this.state);
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <Row>
                <Col sm={{size:6, offset:3}}>
                    <img className="img-fluid mx-auto d-block" src="https://i.imgur.com/WawaXKU.png" alt="FRISS"/>
                    <AvForm>
                        <EmailInput value={this.state.email} onChange={this.handleChange}/>
                        <PasswordInput value={this.state.password} onChange={this.handleChange}/>
                        <Button onClick={this.handleLogin} block={true} color="primary">Log In</Button>
                        <div className="links-container">
                            <a href="/signup">Sign Up</a>
                            <a href="/forgot">Forgot Password?</a>
                        </div>
                    </AvForm>
                </Col>
            </Row>
        )
    }
}