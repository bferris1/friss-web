import React, { Component } from 'react';
import uuid from 'uuid';

import TeamMembers from './TeamMemberTable'
import AddMember from './AddMember';

export default class TeamManagement extends Component{
    constructor(){
        super();
        this.state = {
            addForm: false,
            members: []
        };
        this.addNewForm = this.addNewForm.bind(this);
        this.handleAddMember = this.handleAddMember.bind(this);
        this.handleDeleteMember = this.handleDeleteMember.bind(this);
        this.handlePermissionChange = this.handlePermissionChange.bind(this);
    }

    componentDidMount(){
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
        this.setState({addForm: false});
        // TODO: save in local data for refresh
    }

    handleDeleteMember(member){
        // eslint-disable-next-line
        let del = confirm("Are you sure you want to remove " + member.name + " from the team?");
        if(!del){
            return;
        }
        let members = this.state.members.filter(function (candidate) {
            return candidate !== member;
        });
        this.setState({members:members});
    }


    handlePermissionChange(index, e){
        let members = this.state.members;
        members[index][e.target.name] = e.target.checked;
        this.setState({members:members})
    }

    addNewForm(){
        this.setState({addForm: true});
    }


    render(){

        // Show a link to create new form or a new form but not both.
        let newForm = null;
        let newFormLink = <button type='button' className='btn btn-link' onClick={this.addNewForm}>Add Team Member</button>
        if(this.state.addForm){
            console.log('adding a new form');
            newForm = <AddMember addMember={this.handleAddMember} />
            newFormLink = null;
        }

        return (
            <div className='TeamManagement'>
                <h1>Scouting Team Member Management</h1>
                {newFormLink}
                {newForm}
                <TeamMembers members={this.state.members}
                             onDelete={this.handleDeleteMember}
                             onChange={this.handlePermissionChange}
                />
            </div>
        );
    }
}
