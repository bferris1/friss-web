import React, {Component} from 'react';
import {CountryDropdown, RegionDropdown} from 'react-country-region-selector';
import {Button, Col, Form, Label, Row} from 'reactstrap';
import {LabeledInput} from '../form'
import Auth from '../AuthCtrl';


import 'react-select/dist/react-select.css';

export default class Team extends Component{

  constructor(props){
      super(props);
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
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
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

    handleAddressChange(newInput){
        this.setState({
            info: {
                ...this.state.info,
                address: {
                    ...this.state.info.address,
                    ...newInput
                }
            }});
    }

    handleInfoChange(newInput){
        this.setState({
            info: {
                ...this.state.info,
                ...newInput
            }
        });
    }

    handleSubmit(e){
        e.preventDefault();
        if (!this.state._id)
            Auth.post('/api/team', this.state).then((response)=>{
                console.log(response);
                if (response.success){
                    //notify user
                }
            });
        else (Auth.post('/api/team/update', this.state)).then(response => {
            console.log(response);
        })
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
                          <LabeledInput name="name" label={"Team Name"}
                                        value={this.state.name}
                                        onChange={this.handleChange}/>
                  </Col>
                      <Col sm={4}>
                          <LabeledInput name="number" label={"Team Number"}
                                        value={this.state.number}
                                        onChange={this.handleChange} />
                      </Col>
                  </Row>
                  <Row>
                      <Col sm={12}>
                        <LabeledInput name="school" label={"Team School"}
                                      value={this.state.info.address.school}
                                      onChange={e => {this.handleAddressChange({school:e.target.value})}} />
                      </Col>
                  </Row>
                  <Row>
                      <Col sm={12}>
                        <LabeledInput name="webpage" label={"Web Site"}
                                      value={this.state.info.webpage}
                                      onChange={e => {this.handleInfoChange({webpage:e.target.value})}} />
                      </Col>
                  </Row>

              <h4 style={{marginTop:'30px'}}>Location</h4>
                <Row>
                  <Col sm={12}>
                    <Label>Country</Label>
                    <CountryDropdown
                      classes='form-control'
                      value={this.state.info.address.country}
                      onChange={country => {this.handleAddressChange({country:country})}} />
                  </Col>
                </Row>
                <Row>
                  <Col sm={12} style={{marginTop:'15px', marginBottom:'15px'}}>
                    <Label>State or Region</Label>
                    <RegionDropdown
                      classes='form-control'
                      country={this.state.info.address.country}
                      value={this.state.info.address.stateOrProv}
                      onChange={state => {this.handleAddressChange({stateOrProv: state})}} />
                  </Col>
                </Row>
                <Row>
                  <Col sm={12}>
                    <LabeledInput name="city" label={"City"} value={this.state.info.address.city}
                                  onChange={e => {this.handleAddressChange({city:e.target.value})}} />
                  </Col>
                </Row>
                <Button color="primary" type="submit">Submit</Button>
              </Form>
          </div>
      )
  }
}
