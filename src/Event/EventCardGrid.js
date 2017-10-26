import React, { Component } from 'react';
import {Row} from 'reactstrap';

import {LabeledCard} from '../Card'

export default class EventCardGrid extends Component{

    render() {
        let eventCards;
        if(this.props.events){
            eventCards = this.props.events.map((eventItem, index) => {
                // return a Member component
                console.log(eventItem);
                return (
                    <LabeledCard title={eventItem["name"]} description={eventItem["city"]}
                                 buttonText={"Set Game"} col_sm={6}
                                 key={eventItem.id} link={"/game"} />
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
