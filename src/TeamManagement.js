import React, { Component } from 'react';

import TeamMembers from './TeamMembers';

export default class TeamManagement extends Component{
    constructor(){
      super();
      this.state = {
        members: [
          {
            name: 'John Doe',
            email: 'john.doe@example.com'
          }
        ]
      }
    }

    render(){
        return (
          <div className='TeamManagement'>
            <h1>Scouting Team Member Management</h1>
            <TeamMembers members={this.state.members}/>
          </div>
        );
    }
}
