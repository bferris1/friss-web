import React, { Component } from 'react';
import {Row} from 'reactstrap';

import {LabeledCard} from '../Card'

export default class EventCardGrid extends Component{

    render() {
        let eventCards;
        if(this.props.evesnt){
            eventCards = this.props.events.map((event, index) => {
                // return a Member component
                return (
                    <LabeledCard title={event.name} description={event.description}
                                 buttonText={"Set Game"} col_sm={6}
                                 key={event.id} link={"/event/"+event.id}/>
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
