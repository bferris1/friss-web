import React from 'react';
import {Button} from 'reactstrap';
import EventSelectionList from './EventSelectionList';
import EventCardGrid from './EventCardGrid';
import Auth from '../AuthCtrl';
import Alerts from '../Alerts';

export default class Events extends React.Component {

    constructor(props) {

        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleAddEvent = this.handleAddEvent.bind(this);
        this.updateEvent = this.updateEvent.bind(this);

        this.state = {
            teamId: null,
            gameIds: [],
            events: [],
            showAddEventForm: false
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

            // Set current team ID.
            this.setState({
                teamId: json['_id']
            });

            // Iterate through event IDs..
            let events_array = json['attendedEvents'];

            // Set game IDs.
            this.setState({
                gameIds: json['games']
            });


            for (let i = 0; i < events_array.length; i++) {
                let eventID = events_array[i];

                // Fetch data for each event.
                Auth.get('/api/event/' + eventID).then((response) => {
                    if (response.success) {
                        return response;
                    } else {
                        alert('Error fetch event data for event ID : ' + eventID);
                    }
                }).then((json) => {

                    // Update state with team's events.
                    var events = this.state.events;
                    events.push(json.event);
                    this.setState({
                        events: events
                    });

                });
            }

        });
    }


    handleAddEvent(eventObj) {
        let event = {
            name: eventObj["name"],
            location: eventObj["city"],
            date: eventObj["start_date"]
        };

        // Add event to event database.
        Auth.post('/api/event', event).then((res) => {

            if (res.success) {
                // Add event to team by passing in event ID.
                const eventId = res.event['_id'];
                let eventIdJson = {
                    eventId: eventId
                };

                // Add event to current team's attended events.
                Auth.post('/api/team/event', eventIdJson).then((response) => {
                    if (response.success) {
                        this.setState({
                            alerts: {success: "Event Created Successfully!"},
                            events: [...this.state.events, res.event]
                        });
                    }
                    else {
                        this.setState({alerts: {danger: response.error}});
                        console.log(response);
                    }
                });
            } else
                this.setState({alerts: {danger: res.error}});
            setTimeout(() => {
                this.setState({alerts: {}})
            }, 6000);
        });

        this.setState({
            showAddEventForm: false
        });
    }

    updateEvent(updatedEvent) {

        var events = this.state.events;
        for (var i = 0; i < events.length; i++) {
            if (events[i]._id === updatedEvent._id) {
                events[i] = updatedEvent;
                break;
            }
        }

        this.setState({events: events});
    }

    handleChange(e) {
        if (e.target.name === 'addEvent') {
            this.setState({
                showAddEventForm: true
            });
        }
    }

    render() {
        var addEventLink = null;
        var eventListView = null;
        if (this.state.showAddEventForm === true) {
            eventListView = <EventSelectionList addEventHandler={(eventObj) => this.handleAddEvent(eventObj)}/>
        } else {
            addEventLink =
                <Button color="link" name="addEvent" value={true} onClick={this.handleChange}>Add A New Event</Button>
        }

        return (
            <div className="row">
                <div className={"col-12"}>
                    <Alerts alerts={this.state.alerts}/>
                    {addEventLink}
                    {eventListView}

                    <EventCardGrid updateEvent = {this.updateEvent} events={this.state.events} gameIds={this.state.gameIds}/>
                </div>
            </div>
        );
    }
}