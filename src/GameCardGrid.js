import React, { Component } from 'react';
import {Row, Col} from 'reactstrap';

import {LabeledCard} from './Card'

export default class GameCardGrid extends Component{

    render(){
      let gameCards;
      if(this.props.games){
         gameCards = this.props.games.map((game, index) => {
             // return a Member component
             return (
                 <LabeledCard title={game.name} description={game.description}
                              buttonText={"Add Metrics"} col_sm={6}
                              key={game.id}/>
             );
         });
       }

       return(
         <Row>
            {gameCards}
        </Row>
       )

    }
}
