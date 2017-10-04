import React, { Component } from 'react';
import uuid from 'uuid';
import {Form, Button} from 'reactstrap';

import {LabeledInput} from '../form';

export default class AddMember extends Component{
  constructor(){
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {};
  }

  handleChange(e){
      this.setState({[e.target.name]:e.target.value});
  }

  handleSubmit(e){
      e.preventDefault();
      this.props.addGame(this.state);

  }

  render(){
    return(
      <div style={{marginTop:'30px'}}>
        <h3>Create a New Game</h3>
        <Form onSubmit={this.handleSubmit}>
          <LabeledInput name="name" label={"Name"} type={"text"} value={this.state.name} onChange={this.handleChange}/>
          <LabeledInput name="description" label={"Description"} type={"textarea"} value={this.state.description} onChange={this.handleChange}/>
          <Button color="primary">Submit</Button>
        </Form>
      </div>
    )
  }
}
