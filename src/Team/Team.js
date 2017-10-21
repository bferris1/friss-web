import React, { Component } from 'react';
import Select from 'react-select';
import {Row, Col, Label} from 'reactstrap';
import {AvForm} from 'availity-reactstrap-validation';
import {PasswordInput, LabeledInput, EmailInput} from '../form'


import 'react-select/dist/react-select.css';

export default class Team extends Component{

  constructor(props){
      super(props);
      var Select = require('react-select');
      //dummy data
      var options = [
        { value: 'one', label: 'One' },
        { value: 'two', label: 'Two' }
      ];
      this.state={teamName:'Techno Kats', teamNum:45, teamWeb:'www.technokats45.com', select: ''};
      this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
      console.log("mounted")
  }

  handleChange(e){
      this.setState({[e.target.name]:e.target.value});
  }

  render(){

    var options = [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' }
    ];

      return (
        <div>
              <h1>Team Profile</h1>
              <h3>FRC Team: {this.state.teamNum} -- {this.state.teamName}</h3>
              <h4 style={{marginTop:'30px'}}>General Info</h4>
              <AvForm>
                  <Row>
                      <Col sm={8}>
                          <LabeledInput name="teamName" label={"Team Name"} value={this.state.teamName} onChange={this.handleChange}/>
                  </Col>
                      <Col sm={4}>
                          <LabeledInput name="teamNum" label={"Team Number"} value={this.state.teamNum} onChange={this.handleChange} />
                      </Col>
                  </Row>
                  <Row>
                      <Col sm={12}>
                        <LabeledInput name="teamWeb" label={"Web Site"} value={this.state.teamWeb} onChange={this.handleChange} />
                      </Col>
                  </Row>
              </AvForm>
              <h4 style={{marginTop:'30px'}}>Location</h4>
              <AvForm>
                <Row>
                  <Col sm={9}>
                    <Label>Select Test</Label>
                    <Select
                      name="select"
                      value="one"
                      options={options}
                      onChange={this.handleChange}
                    />
                  </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <LabeledInput name="country" label={"Country"} value={this.state.teamName} onChange={this.handleChange}/>
                    </Col>
                    <Col sm={6}>
                        <LabeledInput name="state" label={"State"} value={this.state.teamNum} onChange={this.handleChange} />
                    </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    <LabeledInput name="city" label={"City"} value={this.state.city} onChange={this.handleChange} />
                  </Col>
                </Row>
              </AvForm>
          </div>
      )
  }
}
