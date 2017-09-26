import React, { Component } from 'react';
import uuid from 'uuid';

import TeamMembers from './TeamMembers'
import AddMember from './AddMember';

export default class TeamManagement extends Component{
    constructor(){
      super();
      this.state = {
        addForm: false,
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

      // remove the add member form
      let addForm = this.state.addForm;
      this.setState({addForm: false});
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
      console.log('Scout Permissions Changed: ' + members[index].name + ' ' + members[index].scouter.toString());
      this.setState({members:members});
    }

    handleSetDataAnaPriv(id){
      let members = this.state.members;
      let index = members.findIndex(x => x.id === id);
      members[index].dataAnalyzer = !members[index].dataAnalyzer;
      console.log('dataAnalyzer Permissions Changed: ' + members[index].name + ' ' + members[index].dataAnalyzer.toString());
      this.setState({members:members});
    }

    addNewForm(){
      let addForm = this.state.addForm;
      this.setState({addForm: true});
    }


    render(){

        // Show a link to create new form or a new form but not both.
        let newForm = null;
        let newFormLink = <button type='button' className='btn btn-link' onClick={this.addNewForm.bind(this)}>Add Team Member</button>
        if(this.state.addForm){
          console.log('adding a new form');
          newForm = <AddMember addMember={this.handleAddMember.bind(this)} />
          newFormLink = null;
        }

        return (
          <div className='TeamManagement'>
            <h1>Scouting Team Member Management</h1>
            {newFormLink}
            {newForm}
            <TeamMembers members={this.state.members}
                         onDelete={this.handleDeleteMember.bind(this)}
                         onSetScout={this.handleSetScoutPriv.bind(this)}
                         onSetDataAna={this.handleSetDataAnaPriv.bind(this)}
            />
          </div>
        );
    }
}
