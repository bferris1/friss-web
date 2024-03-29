import React, { Component } from 'react';
import uuid from 'uuid';
import Auth from '../AuthCtrl';
import Alerts from '../Alerts';

import TeamMembers from './TeamMemberTable'
import AddMemberForm from './AddMemberForm';

export default class TeamManagement extends Component{
    constructor(){
        super();
        this.state = {
            addForm: false,
            team: '',
            user: '',
        };
        this.addNewForm = this.addNewForm.bind(this);
        this.handleAddMember = this.handleAddMember.bind(this);
        this.handleDeleteMember = this.handleDeleteMember.bind(this);
        this.handlePermissionChange = this.handlePermissionChange.bind(this);
        this.updateTeam = this.updateTeam.bind(this);
    }

    componentDidMount(){
        // this is where we will call API for team member population
        /*this.setState({members: [
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
        ]});*/

        Auth.get('/api/team').then(res => {
            if (res.success){
                this.setState({team:res.team});
            } else {
                alert(res.error);
            }
        });

        if (Auth.isLoggedIn())
            Auth.get('/api/account').then((res)=>{
                if (res.success)
                    this.setState({user:res.user});
                //console.log(res);
            })

    }

    updateTeam(){
      Auth.get('/api/team').then(res => {
          if (res.success){
              this.setState({team:res.team});
          } else {
              alert(res.error);
          }
      });
    }

    handleAddMember(member){

      let members = this.state.team.members.slice();
        Auth.post('/api/team/member', {email: member.email}).then(res => {
          if(res.success){
              this.updateTeam();
          }
          else{
            alert(res.error);
          }
        });
        // adding new member to state.
        // take a newMember from AddMemberForm component

        // remove the add member form
        this.setState({addForm: false});
        // TODO: save in local data for refresh
    }

    handleDeleteMember(member){
        // eslint-disable-next-line
        let del = confirm("Are you sure you want to remove " + member.profile.firstName + member.profile.lastName + " from the team?");
        if(!del){
            return;
        }

        let removeInfo = {
          user: this.state.user,
          memberid: member._id
        };

        Auth.post('/api/team/member', {memberid: member._id}).then(res => {
          if(res.success){
              this.updateTeam();
          }
          else{
            alert(res.error);
          }
        });

        /*let members = this.state.members.filter(function (candidate) {
            return candidate !== member;
        });
        this.setState({members:members});*/
    }


    handlePermissionChange(index, e){
        let members = this.state.team.members.slice();
        members[index][e.target.name] = e.target.checked;

        let memberInfo = {
          memberid: members[index]["_id"],
          canScout: members[index]["canScout"],
          canAnalyze: members[index]["canAnalyze"]
        };

        console.log(memberInfo);

        Auth.post('/api/team/perm', memberInfo).then(res => {
          if(res.success){
              console.log("team updated after perm change.");
              this.updateTeam();
          }
          else{
            alert(res.error);
          }
        });

        //this.setState({members:members})
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
            newForm = <AddMemberForm addMember={this.handleAddMember} />;
            newFormLink = null;
        }

        return (
            <div className='TeamManagement'>
                <h1>Scouting Team Member Management</h1>
                {newFormLink}
                {newForm}
                <TeamMembers members={this.state.team.members}
                             onDelete={this.handleDeleteMember}
                             onChange={this.handlePermissionChange}
                />
            </div>
        );
    }
}
