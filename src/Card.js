import React from 'react';
import {Col, Card, CardBlock, CardTitle, CardText, Button} from 'reactstrap'

export const LabeledCard = (props) => {
  return (
    <Col sm={props.col_sm} style={{marginTop:'15px'}}>
      <Card>
        <CardBlock>
          <CardTitle>{props.title}</CardTitle>
          <CardText>{props.description}</CardText>
          <Button color="primary" onClick={props.onClick}>{props.buttonText}</Button>
        </CardBlock>
      </Card>
    </Col>
  )
}
