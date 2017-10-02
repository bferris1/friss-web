import React, { Component } from 'react';

export default class TeamDetails extends Component{

    render(){
        return <div>
            <h1>Team Details</h1>
            <p>Details for team with id {this.props.match.params.teamId}</p>
        </div>
    }
}
