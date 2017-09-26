import React, { Component } from 'react';

export default class TeamMembers extends Component{
  deleteMember(id){
    //alert("this is working");
    //eslint-disable-next-line
    let del = confirm("Are you sure you want to remove this team member?");
    if(del){
      this.props.onDelete(id);
    } else {
      //do nothing
    }
    //this.props.onDelete(id);

  }

  setScoutPriv(id){
    this.props.onSetScout(id);
  }

  setDataAnaPriv(id){
    this.props.onSetDataAna(id);
  }

  //TODO:
  // style={{//text-align: 'center'}}
  // {() => {if(confirm('Delete the item?')) {this.deleteMember.bind(this, this.props.member.id)};}}
    render(){
        return (
            <tr>
              <td>{this.props.member.name}</td>
              <td>{this.props.member.email}</td>
              <td>
                <input type='checkbox' value='true' ref='scouterTable'
                      defaultChecked={this.props.member.scouter === true}
                      onClick={this.setScoutPriv.bind(this, this.props.member.id)}
                  />
              </td>
              <td>
                <input type='checkbox' value='true' ref='dataAnalyzerTable'
                      defaultChecked={this.props.member.dataAnalyzer === true}
                      onClick={this.setDataAnaPriv.bind(this, this.props.member.id)}
                />
              </td>
              <td><button type='button' className='btn btn-danger' onClick={this.deleteMember.bind(this, this.props.member.id)}>Remove</button></td>
            </tr>
        )
    }
}
