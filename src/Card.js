import React from 'react';
import {Col, Card, CardBlock, CardTitle, CardText} from 'reactstrap'
import {Link} from 'react-router-dom';
import {LabeledInput} from "./form";

export const LabeledCard = (props) => {
  return (
    <Col sm={props.col_sm} style={{marginTop:'15px'}}>
      <Card>
        <CardBlock>
          <CardTitle>{props.title}</CardTitle>
          <CardText>{props.description}</CardText>
            <Link className={"btn btn-block btn-primary"} to={props.link}>{props.buttonText}</Link>
          {/*<Button color="primary" onClick={props.onClick}>{props.buttonText}</Button>*/}
        </CardBlock>
      </Card>
    </Col>
  )
};

export const EventCard = (props) => {

    let games = props.games.map((game, index) => {
        return (<option key = {index + 1} value = {game['_id']}>{game['name']}</option>);
    });
    games.unshift(<option key = {0}></option>);

    return (
        <Col sm={props.col_sm} style={{marginTop:'15px'}}>
            <Card>
                <CardBlock>
                    <CardTitle>{props.title}</CardTitle>
                    <CardText>{props.description}</CardText>

                    <LabeledInput type={"select"} label={"Set Game"} value = {props.gameId} id={props.gameId} onChange={props.onChange}>
                        {games}
                    </LabeledInput>
                    <Link className={"btn btn-block btn-primary"} to={props.link}>{props.buttonText}</Link>
                </CardBlock>
            </Card>
        </Col>
    );
};