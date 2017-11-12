import React, { Component } from 'react';
import {Row} from 'reactstrap';
import Auth from '../AuthCtrl';

import {EventCard} from '../Card'

export default class EventCardGrid extends Component{

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            gameIds: [],
            games: [],
            value: "1"
        }
    }

    componentDidMount() {

        // Fetch event IDs from the current team's attended events.
        Auth.get('/api/team').then((response) => {
            if (response.success) {
                return response['team'];
            } else {
                alert('Error fetching team event IDs.');
            }
        }).then((json) => {

            var gameIds = json['games'];

            // Iterate through game IDs.
            for (var i = 0; i < gameIds.length; i++) {

                let gameID = gameIds[i];

                if (gameID === null) { continue; }

                // Fetch data for each game.
                Auth.get('/api/games/' + gameID).then((response) => {
                    if (response.success) {

                        return response['game'];
                    } else {
                        alert('Error fetch event data for game ID : ' + gameID);
                    }
                }).then((json) => {
                    // Update state with team's events.
                    var games = this.state.games;
                    games.push(json);
                    this.setState({
                        games: games
                    });
                });
            }

        });

    }

    handleChange(index, e) {

        // Get event.
        var modified_event = this.props.events[index];
        var modified_event_id = modified_event['_id'];

        var modified_event_json = {
            game: e.target.value
        };

        Auth.post('/api/event/' + modified_event_id, modified_event_json).then((response) => {
            if (response.success) {
                this.props.updateEvent(response.event);
            } else {
                alert('Unable to update event with new game.');
            }
        });

    }

    render() {

        let eventCards;
        if(this.props.events){
            eventCards = this.props.events.map((eventItem, index) => {
                var gameName = "";
                if (eventItem['game']) {
                    // Find the game object in this.state.games that has the same _id as eventItem['game']
                    // Set gameName to gameObject['name']

                    this.state.games.forEach((stateGame) => {
                        if (eventItem.game === stateGame._id) {
                            gameName = stateGame._id;
                        }
                    })
                }


                return (
                    <EventCard title={eventItem["name"]} description={eventItem["city"]}
                               buttonText={"Scout"} col_sm={6}
                               key={index} link={"/event/" + eventItem._id} games={this.state.games} gameId={gameName} onChange = {(e) => {this.handleChange(index, e)}}/>
                );
            });
        }

        return(
            <Row>
                {eventCards}
            </Row>
        )

    }
}
