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

        // Fetch event IDs from the current team's attended events.
        Auth.get('/api/team').then((response) => {
            if (response.success) {
                return response['team'];
            } else {
                alert('Error fetching team event IDs.');
            }
        }).then((json) => {

            // Set current team ID.
            this.setState({
                teamId: json['_id']
            });

            // Iterate through game IDs.
            let games_array = json['games'];
            for (let i = 0; i < games_array.length; i++) {
                let gameID = games_array[i];
                if (gameID === null) {
                    continue;
                }
                // Fetch data for each game.
                Auth.get('/api/game/' + gameID).then((response) => {
                    if (response.success) {
                        return response;
                    } else {
                        alert('Error fetch event data for game ID : ' + gameID);
                    }
                }).then((json) => {

                    // Update state with team's events.
                    var games = this.state.games;
                    games.push(json.game);
                    this.setState({
                        games: games
                    });

                });
            }

        });
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    handleAddGame(game) {

        var games = this.state.games;

        // Add game to database.
        Auth.post('/api/game', game).then(response => {
            if (response.success) {
                return response['game'];
            } else {
                alert('Error adding game to database.');
            }
        }).then((json) => {

            games.push(json);

            const gameId = json['_id'];
            let gameIdJson = {
                gameId: gameId
            };

            // Add game to team.
            Auth.post('/api/team/game', gameIdJson).then((response) => {
                if (response.success) {
                    console.log(response);
                    // Add game to grid.
                    this.setState({ games: games});

                } else {
                    alert('Error adding game to team.');
                }
            });
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
