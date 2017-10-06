import React, {Component} from 'react';
import {Row, Col, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
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
        this.setState({[e.target.name]:e.target.value});
    }

    render() {
        return (
            <Row>
                <Col sm={{size:6, offset:3}}>
                    <img className="img-fluid mx-auto d-block" src="https://i.imgur.com/WawaXKU.png" alt="FRISS"/>
                    <AvForm onSubmit={this.handleLogin}>
                        <EmailInput value={this.state.email} onChange={this.handleChange}/>
                        <PasswordInput value={this.state.password} onChange={this.handleChange}/>
                        <Button type={"submit"} block={true} color="primary">Log In</Button>
                        <div className="links-container">
                            <Link to="/signup">Sign Up</Link><br/>
                            <Link to="/forgot">Forgot Password?</Link>
                        </div>
                    </AvForm>
                </Col>
            </Row>
        )
    }
}