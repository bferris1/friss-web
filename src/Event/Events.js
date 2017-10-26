import React from 'react';
import { Button } from 'reactstrap';
import EventList from './EventList';
import EventCardGrid from './EventCardGrid';

export default class Events extends React.Component {
    constructor(props) {

        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleAddEvent = this.handleAddEvent.bind(this);

        this.state = {
            events: [],
            showAddEventForm: false
        }
    }

    handleAddEvent(eventObj) {
        let events_temp = this.state.events;
        events_temp.push(eventObj);
        this.setState({
            events: events_temp,
            showAddEventForm: false
        });
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
            eventListView = <EventList addEventHandler={(eventObj) => this.handleAddEvent(eventObj)}/>
        } else {
            addEventLink = <Button color="link" name="addEvent" value={true} onClick={this.handleChange}>Add A New Event</Button>
        }

        return (
            <div className="Event">
                {addEventLink}
                {eventListView}
                <EventCardGrid events={this.state.events} />
            </div>
        );
    }
}