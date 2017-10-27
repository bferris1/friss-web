import React from 'react';
import { Button } from 'reactstrap';
import EventSelectionList from './EventSelectionList';
import EventCardGrid from './EventCardGrid';
import Auth from '../AuthCtrl';
import Alerts from '../Alerts';

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
        let event = {
            name:eventObj["name"],
            location:eventObj["city"],
            date:eventObj["start_date"]
        };
        Auth.post('/api/event', event).then((res)=>{
            if (res.success) {
                this.setState({
                    alerts: {success: "Event Created Successfully!"},
                    events: [...this.state.events, res.event]
                });
            }
            else
                this.setState({alerts:{danger:res.error}});
            setTimeout(()=>{this.setState({alerts:{}})}, 6000);
        });

        this.setState({
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
            eventListView = <EventSelectionList addEventHandler={(eventObj) => this.handleAddEvent(eventObj)}/>
        } else {
            addEventLink = <Button color="link" name="addEvent" value={true} onClick={this.handleChange}>Add A New Event</Button>
        }

        return (
            <div className="row">
                <div className={"col-12"}>
                    <Alerts alerts={this.state.alerts}/>
                    {addEventLink}
                    {eventListView}
                    <EventCardGrid events={this.state.events} />
                </div>
            </div>
        );
    }
}