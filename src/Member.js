import React, { Component } from 'react';

export default class TeamMembers extends Component{

    render(){
        return (
          /*<li className='Member'>
            {this.props.member.name} -- {this.props.member.email}
          </li>*/
            <tr>
              <td>{this.props.member.name}</td>
              <td>{this.props.member.email}</td>
            </tr>
        )
    }
}
