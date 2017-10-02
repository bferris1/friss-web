import React from 'react';
import {Col, Card, CardBlock, CardTitle, CardText, Button} from 'reactstrap'
import {Link} from 'react-router-dom';

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
}
