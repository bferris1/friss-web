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
      // this is where we will call API for team member population
      this.setState({members: [
        {
          name: 'John Doe',
          email: 'john.doe@example.com',
          scouter: true,
          dataAnalizer: false
        },
        {
          name: 'Billy Bob',
          email: 'bill.bob@example.com',
          scouter: true,
          dataAnalizer: true
        }
      ]});
    }

    handleAddMember(member){
      // adding new member to state.
      // take a newMember form AddMember component
      let members = this.state.members;
      members.push(member);
      this.setState({members:members});
      // TODO: save in local data for refresh
    }

    render(){
        return (
          <div className='TeamManagement'>
            <h1>Scouting Team Member Management</h1>
            <AddMember addMember={this.handleAddMember.bind(this)} />
            <TeamMembers members={this.state.members} />
          </div>
        );
    }
}
