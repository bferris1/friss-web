import React, { Component } from 'react';
import {Row} from 'reactstrap';

import {LabeledCard} from '../Card'

export default class GameCardGrid extends Component{

    render(){
      let gameCards;
      if(this.props.games){
         gameCards = this.props.games.map((game, index) => {
             // return a Member component
             return (
                 <LabeledCard title={game.name} description={game.description}
                              buttonText={"Add Metrics"} col_sm={6}
                              key={game._id} link={"/game/"+game._id}>
                     <button className={"btn btn-block btn-danger"} onClick={e => {this.props.onDelete(game)}}>Delete Game</button>
                 </LabeledCard>
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
