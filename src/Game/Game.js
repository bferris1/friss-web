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
        this.fetchGames = this.fetchGames.bind(this);
        this.handleDeleteGame = this.handleDeleteGame.bind(this);
        this.state = {
            addForm: false,
            games: []
        }
    }

    componentDidMount(){
        this.fetchGames();
    }

    fetchGames(){
        Auth.get('/api/games').then(response => {
            if (response.success)
                this.setState({
                    games:response.games
                })
        });
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    handleAddGame(game) {

        let games = this.state.games.slice();

        // Add game to database.
        Auth.post('/api/games', game).then(response => {
            if (response.success) {
                return response['game'];
            } else {
                alert('Error adding game to database.');
            }
        }).then((json) => {
            games.push(json);
            this.setState({games})
        });

        this.setState({addForm:false});
    }

    handleDeleteGame(game){
        console.log(game);
        Auth.delete(`/api/games/${game._id}`).then(res => {
            if (res.success){
                // probably show alert here
                // if we have the API return a new list of games, we could update state here
                this.fetchGames();
            }
        });
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
                <GameCardGrid games={this.state.games} onDelete={this.handleDeleteGame} />
            </div>
        )
    }
}
