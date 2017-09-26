import React, { Component } from 'react';
import uuid from 'uuid';

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
          id: uuid.v4(),
          name: 'John Doe',
          email: 'john.doe@example.com',
          scouter: true,
          dataAnalyzer: false
        },
        {
          id: uuid.v4(),
          name: 'Billy Bob',
          email: 'bill.bob@example.com',
          scouter: true,
          dataAnalyzer: true
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

    handleDeleteMember(id){
      let members = this.state.members;
      let index = members.findIndex(x => x.id === id);
      members.splice(index, 1);
      this.setState({members:members});
    }

    handleSetScoutPriv(id){
      let members = this.state.members;
      let index = members.findIndex(x => x.id === id);
      members[index].scouter = !members[index].scouter;
      this.setState({members:members});
    }

    handleSetDataAnaPriv(id){
      let members = this.state.members;
      let index = members.findIndex(x => x.id === id);
      members[index].dataAnalyzer = !members[index].dataAnalyzer;
      this.setState({members:members});
    }

    render(){
        return (
          <div className='TeamManagement'>
            <h1>Scouting Team Member Management</h1>
            <AddMember addMember={this.handleAddMember.bind(this)} />
            <TeamMembers members={this.state.members}
                         onDelete={this.handleDeleteMember.bind(this)}
                         onSetScout={this.handleSetScoutPriv.bind(this)}
                         onSetDataAna={this.handleSetDataAnaPriv.bind(this)}
            />
          </div>
        );
    }
}
