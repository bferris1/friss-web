import React, { Component } from 'react';
import Select from 'react-select';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import {Row, Col, Label} from 'reactstrap';
import {AvForm} from 'availity-reactstrap-validation';
import {PasswordInput, LabeledInput, EmailInput} from '../form'
import countries from '../Countries.json'


import 'react-select/dist/react-select.css';

export default class Team extends Component{

  constructor(props){
      super(props);
      var Select = require('react-select');
      //dummy data
      this.state={
        name:'Techno Kats',
        number: 45,
        select: '', // for testing only
        info: {
          webpage: 'www.technokats45.com',
          address: {
            country: '',
            stateOrProv: 'Indiana',
            city: 'Kokomo',
            school: 'Kokomo High School'
          },
        },
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleCountryChange = this.handleCountryChange.bind(this);
      this.handleStateChange = this.handleStateChange.bind(this);
  }

  componentDidMount(){
      console.log("mounted")
  }

  handleChange(e){
      this.setState({[e.target.name]:e.target.value});
  }

  handleStateChange(state){
    this.setState({
      info: {
        address: {
          stateOrProv: state
        }
    }});
  }

  handleCountryChange(country){

    if(country === null){
      this.setState({
          info: {
            address: {
              country: ''
            }
        }});
    }
    else{
      this.setState({
        info: {
          address: {
            country: country
          }
      }});
    }
  }

  render(){


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

              <h4 style={{marginTop:'30px'}}>Location</h4>

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
                    <Label>Country</Label>
                    <CountryDropdown
                      classes='form-control'
                      value={this.state.info.address.country}
                      onChange={this.handleCountryChange} />
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} style={{marginTop:'15px', marginBottom:'15px'}}>
                    <Label>State or Region</Label>
                    <RegionDropdown
                      classes='form-control'
                      country={this.state.info.address.country}
                      value={this.state.info.address.stateOrProv}
                      onChange={this.handleStateChange} />
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
