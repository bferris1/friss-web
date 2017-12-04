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
        this.updateEvents = this.updateEvents.bind(this);
        this.handleDeleteEvent = this.handleDeleteEvent.bind(this);



        this.state = {
            teamId: null,
            gameIds: [],
            events: [],
            showAddEventForm: false
        }
    }

    componentDidMount() {

        // Fetch event IDs from the current team's attended events.

        Auth.get('/api/event').then(res => {
            if (res.success){
                this.setState({events:res.events});
            } else {
                //notify
            }
        });
    }

    updateEvents(){
        Auth.get('/api/event').then(res => {
            if (res.success){
                this.setState({events:res.events});
            } else {
                //notify
            }
        });
    }


    handleAddEvent(eventObj) {
        let event = {
            name: eventObj["name"],
            location: eventObj["city"],
            date: eventObj["start_date"],
            eventKey: eventObj['key']
        };

        // Add event to event database.
        Auth.post('/api/event', event).then((res) => {

            if (res.success) {
                this.setState({
                    events: [...this.state.events, res.event]
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

    handleDeleteEvent(eventId){
        Auth.delete(`/api/event/${eventId}`).then(res => {
            console.log(res);
            if (res.success) {
                //notify
            }
            this.updateEvents();
        })
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

                    <EventCardGrid onDelete={this.handleDeleteEvent} updateEvent = {this.updateEvent} events={this.state.events} gameIds={this.state.gameIds}/>
                </div>
            </div>
        );
    }
}
