import React, { Component } from 'react';

export default class GameDetails extends Component{

    render(){
        return <div>
            <h1>Game Details</h1>
            <p>Details for game with id {this.props.match.params.gameId}</p>
        </div>
    }
}
