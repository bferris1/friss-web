import React, { Component } from 'react';
import Member from './Member'

export default class TeamMembers extends Component{
  deleteMember(id){
    this.props.onDelete(id);
  }

    render(){
      let teamMembers;
      if(this.props.members){
        teamMembers = this.props.members.map(member => {
          //console.log(member);
          // return a Member compinent to the tbody
          return (
            <Member onDelete={this.deleteMember.bind(this)} key={member.email} member={member} />
          );
        });
      }
        return (
          <table className='table' style={{marginTop:'30px'}}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Scouter</th>
                <th>Data Analyzer</th>
                <th>Remove Member</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers}
            </tbody>
          </table>
        )
    }
}
