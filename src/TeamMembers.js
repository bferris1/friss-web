import React, { Component } from 'react';
import Member from './Member'

export default class TeamMembers extends Component{

    render(){
      let teamMembers;
      if(this.props.members){
        teamMembers = this.props.members.map(member => {
          //console.log(member);
          return (
            <Member key={member.email} member={member} />
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
                <th>Data Analizer</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers}
            </tbody>
          </table>
        )
    }
}
