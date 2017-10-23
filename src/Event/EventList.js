import React from 'react';
import { Button, Table } from 'reactstrap';
import { flag } from 'country-emoji';

export default class EventList extends React.Component {

    constructor(props) {
        super();
        this.fetchEvents();
        this.state = {
            isLoading: true,
            eventList: []
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
                eventList: json
            });
        });
    }

    render() {

        let eventRows = this.state.eventList.map((eventItem, index) => {
            return (
                <tr>
                    <th><Button key={index} color='link'>{eventItem['name']}</Button></th>
                    <th>{eventItem['start_date']}</th>
                    <th>{eventItem['city']}</th>
                    <th>{flag(eventItem['country'])}</th>
                </tr>
            );
        });

        return (
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
        );
    }
}
