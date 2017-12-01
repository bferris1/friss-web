import React, {Component} from 'react';
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

        Auth.get('/api/games').then(res => {
            if (res.success) {
                this.setState({
                    games:res.games
                })
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
                               key={index} link={"/event/" + eventItem._id}
                               games={this.state.games} gameId={gameName}
                               onDelete={()=>{this.props.onDelete(eventItem._id)}}
                               onChange = {(e) => {this.handleChange(index, e)}}/>
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
