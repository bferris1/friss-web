import React, { Component } from 'react';

export default class AddMember extends Component{
  constructor(){
    super();
    this.state = {
      newMember:{}
    }
  }

  handleSubmit(e){
    // input validation
    e.preventDefault();
    if (this.refs.email.value === ''){
      alert('Email is required');
    }
    else {
      this.setState({newMember:{
        email: this.refs.email.value
      }}, function(){
        //console.log(this.state);
        // pass state to TeamManagement Component

        this.props.addMember(this.state.newMember);
      });
    e.preventDefault();
    }
  }

    render(){
        return (
          <div style={{marginTop:'30px'}}>
            <h3>Add Member to Team</h3>
             <form onSubmit={this.handleSubmit.bind(this)}>
              {/*<div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input type='text' className='form-control' id='name' ref='name' />
              </div>*/}
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input type='text' className='form-control' id='email' ref='email' />
              </div>
              {/*<div>
                <label>Permissions</label>
              </div>
              <div className='checkbox'>
                <label>
                  <input type='checkbox' value='true' ref='scouter' /> Scouter
                </label>
              </div>
              <div className='checkbox'>
                <label>
                  <input type='checkbox' value='true' ref='dataAnalyzer' /> Data Analyzer
                </label>
              </div>*/}
              <input type='submit' className='btn btn-info' value='Submit' />
            </form>
          </div>
        )
    }
}
