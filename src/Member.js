import React, { Component } from 'react';

export default class TeamMembers extends Component{
  deleteMember(id){
    this.props.onDelete(id);
  }

  setScoutPriv(id){
    this.props.onSetScout(id);
  }

  setDataAnaPriv(id){
    this.props.onSetDataAna(id);
  }

    render(){
        return (
          /*<li className='Member'>
            {this.props.member.name} -- {this.props.member.email}
          </li>*/
            <tr>
              <td>{this.props.member.name}</td>
              <td>{this.props.member.email}</td>
              <td><input type='checkbox' value='true' ref='scouterTable'
                      checked={this.props.member.scouter === true}
                      onClick={this.setScoutPriv.bind(this, this.props.member.id)}
                  />
              </td>
              <td><input type='checkbox' value='true' ref='dataAnalyzerTable'
                      checked={this.props.member.dataAnalyzer === true}
                      onClick={this.setDataAnaPriv.bind(this, this.props.member.id)}
                  />
              </td>
              <td><button type="button" class="btn btn-danger" onClick={this.deleteMember.bind(this, this.props.member.id)}>Remove</button></td>
            </tr>
        )
    }
}
