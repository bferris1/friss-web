import React, { Component } from 'react';
import {Button} from 'reactstrap';
import Auth from '../AuthCtrl';

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

    componentDidMount(){
        // would fetch from API, but it doesn't currently support it
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value});
        console.log(this.state);
    }

    handleAddGame(game){
        Auth.post('/api/game',game).then(res =>{
            console.log(res);
            if (res.success){
                this.setState({games:[...this.state.games, res.game]});
            }else {

            }
        });
        this.setState({addForm:false});
    }

    render(){

        let newForm = null;
        let newFormLink = <Button color="link" name={"addForm"} value={true}
                                  onClick={this.handleChange}>Add a New Game</Button>
        if(this.state.addForm){
            newForm = <NewGameForm addGame={this.handleAddGame} />;
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
