import React, {Component} from 'react';
import './Forgot.css';
import {Row, Col, Button} from 'reactstrap';
import {EmailInput} from './form';
import {AvForm} from 'availity-reactstrap-validation';
export default class Forgot extends Component {

    constructor(props){
        super (props);
        this.state = {};
    }

    handleReset() {
        console.log(this.state);
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    render() {
        return (
            <Row>
                <Col sm={{size:6, offset:3}}>
                    <h1>Reset Password </h1>
                    <AvForm onSubmit={ this.handleReset }>
                        <EmailInput value={this.state.email} onChange={this.handleChange}/>
                        <Button type={"submit"} block={true} color="primary">Send Reset Email</Button>
                    </AvForm>
                </Col>
            </Row>
        )
    }
}