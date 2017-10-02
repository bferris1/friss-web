import React, { Component } from 'react';

export default class TeamMemberRow extends Component{
  deleteMember(id){
    //alert("this is working");

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
                    <input type='checkbox' name="scouter"
                           checked={this.props.member.scouter}
                           onChange={this.props.onChange}
                    />
                </td>
                <td>
                    <input type='checkbox' name="dataAnalyzer"
                           checked={this.props.member.dataAnalyzer}
                           onChange={this.props.onChange}
                    />
                </td>
                <td><button type='button' className='btn btn-danger' onClick={this.props.onDelete}>Remove</button></td>
            </tr>
        )
    }
}
