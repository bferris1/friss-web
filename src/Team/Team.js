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
      this.state={
        name:'Techno Kats',
        number: 45,
        select: '', // for testing only
        info: {
          webpage: 'www.technokats45.com',
          address: {
            country: 'United States of America',
            stateOrProv: 'Indiana',
            city: 'Kokomo',
            school: 'Kokomo High School'
          },
        },
      };
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
              <h3>FRC Team: {this.state.number} -- {this.state.name}</h3>
              <h4 style={{marginTop:'30px'}}>General Info</h4>
              <AvForm>
                  <Row>
                      <Col sm={8}>
                          <LabeledInput name="name" label={"Team Name"} value={this.state.name} onChange={this.handleChange}/>
                  </Col>
                      <Col sm={4}>
                          <LabeledInput name="number" label={"Team Number"} value={this.state.number} onChange={this.handleChange} />
                      </Col>
                  </Row>
                  <Row>
                      <Col sm={12}>
                        <LabeledInput name="school" label={"Team School"} value={this.state.info.address.school} onChange={this.handleChange} />
                      </Col>
                  </Row>
                  <Row>
                      <Col sm={12}>
                        <LabeledInput name="webpage" label={"Web Site"} value={this.state.info.webpage} onChange={this.handleChange} />
                      </Col>
                  </Row>
              </AvForm>
              <h4 style={{marginTop:'30px'}}>Location</h4>
              <AvForm>
                <Row>
                  <Col sm={9}>
                    <Label>Select Test</Label>
                    <Select style={{marginBottom:'15px'}}
                      name="select"
                      value="one"
                      options={options}
                      onChange={this.handleChange}
                    />
                  </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <LabeledInput name="country" label={"Country"} value={this.state.info.address.country} onChange={this.handleChange}/>
                    </Col>
                    <Col sm={6}>
                        <LabeledInput name="stateOrProv" label={"State"} value={this.state.info.address.stateOrProv} onChange={this.handleChange} />
                    </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    <LabeledInput name="city" label={"City"} value={this.state.info.address.city} onChange={this.handleChange} />
                  </Col>
                </Row>
              </AvForm>
          </div>
      )
  }
}
