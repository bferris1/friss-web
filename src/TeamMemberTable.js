import React, { Component } from 'react';
import Member from './TeamMemberRow'

export default class TeamMembersTable extends Component{

    render(){
        let teamMembers;
        if(this.props.members){
            teamMembers = this.props.members.map((member, index) => {
                // return a Member component
                return (
                    <Member onDelete={()=>{this.props.onDelete(member)}}
                            key={member.id}
                            member={member}
                            onChange={(e)=>this.props.onChange(index, e)}
                    />
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
