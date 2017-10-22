import React, { Component } from 'react';
import Select from 'react-select';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import {Row, Col, Label, Form, Button} from 'reactstrap';
import {AvForm} from 'availity-reactstrap-validation';
import {PasswordInput, LabeledInput, EmailInput} from '../form'
import Auth from '../AuthCtrl';


import 'react-select/dist/react-select.css';

export default class Team extends Component{

  constructor(props){
      super(props);
      //dummy data
      this.state={
        name:'',
        number:'',
        info: {
          webpage: '',
          address: {
            country: '',
            stateOrProv: '',
            city: '',
            school: ''
          },
        },
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleInfoChange = this.handleInfoChange.bind(this);
      this.handleAddressChange = this.handleAddressChange.bind(this);
      this.handleCountryChange = this.handleCountryChange.bind(this);
      this.handleStateChange = this.handleStateChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
      console.log("mounted")
      Auth.get('/api/team').then((response)=>{
          console.log(response);
          if(response.success){
            this.setState(response.team);
          }
      })

  }

  handleChange(e){
      this.setState({[e.target.name]:e.target.value});
  }

  handleAddressChange(e){
    this.setState({
      info: {
        address: {
          [e.target.name]:e.target.value
        }
    }});
  }

  handleInfoChange(e){
    this.setState({
      info: {
        [e.target.name]:e.target.value
      }
    });
  }

  handleSubmit(e){
    e.preventDefault();
    Auth.post('/api/team', this.state).then((response)=>{
        console.log(response);
        alert(response);
    })
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
              <Form style={{marginBottom:'30px'}} onSubmit={this.handleSubmit}>
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
                        <LabeledInput name="school" label={"Team School"} value={this.state.info.address.school} onChange={this.handleAddressChange} />
                      </Col>
                  </Row>
                  <Row>
                      <Col sm={12}>
                        <LabeledInput name="webpage" label={"Web Site"} value={this.state.info.webpage} onChange={this.handleInfoChange} />
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
                    <LabeledInput name="city" label={"City"} value={this.state.info.address.city} onChange={this.handleAddressChange} />
                  </Col>
                </Row>
                <Button color="primary" type="submit">Submit</Button>
              </Form>
          </div>
      )
  }
}
