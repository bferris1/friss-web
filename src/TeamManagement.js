import React, { Component } from 'react';

import TeamMembers from './TeamMembers'
import AddMember from './AddMember';

export default class TeamManagement extends Component{
    constructor(){
      super();
      this.state = {
        members: []
      }
    }

    componentWillMount(){
      this.setState({members: [
        {
          name: 'John Doe',
          email: 'john.doe@example.com',
          scout: false,
          dataAnalizer: false
        },
        {
          name: 'Billy Bob',
          email: 'bill.bob@example.com',
          scout: true,
          dataAnalizer: true
        }
      ]});
    }

    render(){
        return (
          <div className='TeamManagement'>
            <h1>Scouting Team Member Management</h1>
            <AddMember />
            <TeamMembers members={this.state.members}/>
          </div>
        );
    }
}
