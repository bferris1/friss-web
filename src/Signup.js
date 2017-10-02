import React, {Component} from 'react';
import './Signup.css';
import {Row, Col, Button} from 'reactstrap';
import {LabeledInput, EmailInput, PasswordInput} from './form';
import {AvForm} from 'availity-reactstrap-validation';
export default class Signup extends Component {

    constructor(props){
        super (props);
        this.state = {};
    }

    handleSignUp (){
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
                    <AvForm onSubmit={this.handleSignUp}>
                        <LabeledInput label={"Name"}/>
                        <EmailInput value={this.state.email} onChange={this.handleChange}/>
                        <PasswordInput value={this.state.password} onChange={this.handleChange}/>
                        <Button type={"submit"} block={true} color="primary">Sign Up</Button>
                        <div className="links-container">
                            <a href="/login">Log In.</a>
                        </div>
                    </AvForm>
                </Col>
            </Row>
        )
    }
}