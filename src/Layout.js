import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Row, Col} from 'reactstrap';
import {Route, NavLink} from 'react-router-dom';
import Account from './Account'
import Game from './Game'
import Team from './Team';


export default class Layout extends Component{
    render(){
        return(
            <div style={{marginTop:'30px'}}>
                <Row>
                    <Col sm={4}>
                        <h1>Navigation</h1>
                        <ul className="nav flex-column nav-fill nav-pills">
                            <NavLink className="nav-link" exact to="/" activeClassName="active">Home</NavLink>
                            <NavLink className="nav-link" to="/team" activeClassName="active">Team</NavLink>
                            <NavLink className="nav-link" to="/game" activeClassName="active">Game</NavLink>
                            <NavLink className="nav-link" to="/account" activeClassName="active">Account</NavLink>
                        </ul>
                    </Col>

                    <Col sm={8}>
                        <Route path={"/account"} component={Account}/>
                        <Route path={"/game"} component={Game}/>
                        <Route path={"/team"} component={Team}/>
                    </Col>
                </Row>
            </div>
        )
    }
}
