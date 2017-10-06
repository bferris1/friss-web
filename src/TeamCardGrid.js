import React, { Component } from 'react';
import {Row} from 'reactstrap';

import {LabeledCard} from './Card'

export default class TeamCardGrid extends Component{

    render() {
        let teamCards;
        if(this.props.teams) {
            teamCards = this.props.teams.map((team, index) => {
                return (
                    <LabeledCard title={team.name} description={team.description}
                                 buttonText={"View Members"} col_sm={6}
                                 key={team.id} link={"/team/"+team.id}/>
                );
            });
        }

        return(
            <Row>
                {teamCards}
            </Row>
        )

    }
}
