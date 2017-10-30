import React from 'react';
import Auth from '../AuthCtrl';

export default class EventsTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			events = [];
		};
	}

	componentDidMount() {
		
	}

	render() {
		let upcomingEvents = this.state.events.map((upcomingEvent, index) => {
			return (
				<tr>
					<td>{upcomingEvent.name}</td>
					<td>{upcomingEvent.date}</td>
				</tr>
			);
		});

		return (
			<div>
				<h3> Upcoming Events
				<Table>
					<tbody>
						{upcomingEvents}
					</tbody>
				</Table>
			</div>	
		);
	}
}