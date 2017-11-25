import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Row, Col} from 'reactstrap';
import {Route, NavLink, Redirect} from 'react-router-dom';
import Account from './Account'
import Team from './Team/Team'
import TeamManagement from './Team/TeamManagement';
import TeamDetails from './TeamDetails';
import Game from './Game/Game';
import GameDetails from './Game/GameDetails';
import Events from './Event/Events';
import AuthCtrl from './AuthCtrl';
import Home from './Home';
import Matches from './Match/Matches';
import ScoutingReport from './ScoutingReport/ScoutingReportForm';
import MetricWeights from './DataAnalysis/MetricWeightingForm';


export default class Layout extends Component{

    constructor(props){
        super(props);
        this.state = {user:null}
    }

    componentDidMount(){
        if (AuthCtrl.isLoggedIn())
            AuthCtrl.get('/api/account').then((res)=>{
                if (res.success)
                    this.setState({user:res.user});
                //console.log(res);
            })
    }

    render(){
        return(
            !AuthCtrl.isLoggedIn() ? <Redirect to={"/login"}/> :
                <div style={{marginTop:'30px'}}>
                    <Row>
                        <Col sm={4}>
                            <h1>Navigation</h1>
                            <ul className="nav flex-column nav-fill nav-pills">
                                <NavLink className="nav-link" exact to="/" activeClassName="active">Home</NavLink>
                                <NavLink className="nav-link" to="/team" activeClassName="active">Team</NavLink>
                                {/*<NavLink className="nav-link" to="/team-management" activeClassName="active">Team Management</NavLink>*/}
                                {!(this.state.user && this.state.user.teamID) ||
                                <NavLink className="nav-link" to="/events" activeClassName="active">Events</NavLink>
                                }
                                <NavLink className="nav-link" to="/account" activeClassName="active">Account</NavLink>
                                <NavLink className="nav-link" to="/game" activeClassName="active">Game</NavLink>
                            </ul>
                        </Col>

                        <Col sm={8}>
                            <p className={"text-right"}>{this.state.user ? this.state.user.firstName + " " + this.state.user.lastName: "Not Logged In"}</p>
                            <Route exact path={"/"} component={Home} />
                            <Route path={"/account"} component={Account}/>
                            <Route path={"/team-management"} component={TeamManagement}/>
                            <Route exact path={"/team"} component={Team}/>
                            <Route path={"/team/:teamId"} component={TeamDetails}/>
                            <Route exact path={'/game'} component={Game}/>
                            <Route path={'/game/:gameId'} component={GameDetails}/>
                            <Route exact path={'/events'} component={Events}/>
                            <Route path={'/event/:eventId'} component={Matches}/>
                            <Route path={"/test-sr/:matchNum"} component={ScoutingReport}/>
                            <Route path={"/test-mw"} component={MetricWeights}/>

                        </Col>
                    </Row>
                </div>


        )
    }
}
