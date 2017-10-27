import React from 'react';
import { Button, Table } from 'reactstrap';
import { flag } from 'country-emoji';
import {LabeledInput} from "../form";

export default class EventSelectionList extends React.Component {

    constructor(props) {
        super(props);
        this.fetchEvents();
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            isLoading: true,
            eventList: [],
            allItems:[]
        }
    }

    fetchEvents() {
        let API_URL = 'https://www.thebluealliance.com/api/v3/events/2017';
        let requestHeaders = new Headers();
        requestHeaders.append('X-TBA-Auth-Key', 'KRMfzG8uBUXabV2xdBE2NqyB5ntwAjUvr8RVL47fIdDWh2zKRr0vQjNNQfciVkm3'); // TODO: Use a secure file to store the key.
        let requestOptions = {
            method: 'GET',
            headers: requestHeaders,
        };
        fetch(API_URL, requestOptions).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert('Unable to fetch event data from TheBlueAlliance API.');
            }
        }).then ((json) => {
            this.setState({
                isLoading: false,
                eventList: json,
                allItems: json
            });
        });
    }

    handleChange(e) {
        e.preventDefault();
        if (e.target.name === "selectEvent") {
            this.props.addEventHandler(this.state.eventList[e.target.id]);
        } else if(e.target.name === "search"){
            this.setState({
                eventList: this.state.allItems.filter(event => (
                    event.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1 ||
                        event.city.toLowerCase().search(e.target.value.toLowerCase()) !== -1
                    )
                )
        });
        }
    }

    render() {

        let eventRows = this.state.eventList.map((eventItem, index) => {
            return (
                <tr key={index}>
                    <td><a href={""} id={index}
                           onClick={this.handleChange}
                           name="selectEvent">{eventItem['name']}</a></td>
                    <td>{eventItem['start_date']}</td>
                    <td>{eventItem['city']}</td>
                    <td>{flag(eventItem['country'])}</td>
                </tr>
            );
        });

        return (
            <div>
                <LabeledInput autofocus={true} type={"text"} name={"search"} label={"Search Events"} onChange={this.handleChange}/>
                {this.state.isLoading ? <p>Loading Events...</p> :
                    <Table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>City</th>
                            <th>Country</th>
                        </tr>
                        </thead>
                        <tbody>
                        {eventRows}
                        </tbody>
                    </Table>
                }
            </div>
        );
    }
}
