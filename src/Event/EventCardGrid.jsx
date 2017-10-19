import React from 'react';
import {Row} from 'reactstrap';
import {LabeledCard} from '../Card';

export default class EventCardGrid extends React.Component {
	constructor(props) {
		super();
	}

	render() {
		let eventCards;
		if (this.props.events) {
			eventCards = this.props.events.map((event, index) => {
				return (
					<LabeledCard title = {event.name}
								 description = {event.description}
								 buttonText = {"Event"}
								 col_sm = {6}
								 key = {event.id}
								 link = {"/event/" + event.id}
					/>
				);
			});
		}
		return (
			<Row>
				{eventCards}
			</Row>
		);
	}
}
