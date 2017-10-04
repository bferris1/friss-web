import React, { Component } from 'react';
import uuid from 'uuid';
import {Button} from 'reactstrap';

import NewGameForm from './NewGameForm'
import GameCardGrid from './GameCardGrid'

export default class Game extends Component{

    constructor(){
      super();
      this.handleChange = this.handleChange.bind(this);
      this.handleAddGame = this.handleAddGame.bind(this);
      this.addGame = this.handleAddGame.bind(this);
      this.state = {
        addForm: false,
        games: []
      }
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value});
        console.log(this.state);
    }

    handleAddGame(game){
      let games = this.state.games;
      game.id = uuid.v4();
      games.push(game);
      this.setState({games:games});
      this.setState({addForm:false});
      console.log(game);
    }

    render(){

        let newForm = null;
        let newFormLink = <Button color="link" name={"addForm"} value={true} onClick={this.handleChange}>Add a New Game</Button>
        if(this.state.addForm){
          console.log('adding a new form');
          newForm = <NewGameForm addGame={this.handleAddGame} />
          newFormLink = null;
        }


        return(
          <div className='Game'>
            <h1>Create Games</h1>
            {newFormLink}
            {newForm}
            <GameCardGrid games={this.state.games} />
          </div>
        )
    }
}
