import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Row, Col} from 'reactstrap';
import {Route, NavLink, Link, Redirect} from 'react-router-dom';
import Account from './Account'
import Team from './Team';
import AuthCtrl from './AuthCtrl';


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
                console.log(res);
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
                                <NavLink className="nav-link" to="/account" activeClassName="active">Account</NavLink>
                            </ul>
                        </Col>

                        <Col sm={8}>
                            <p><Link className={"text-right"} to={'/account'}>{this.state.user ? this.state.user.firstName + ' ' + this.state.user.lastName: "Not logged in"}</Link></p>
                            <Route path={"/account"} component={Account}/>
                            <Route path={"/team"} component={Team}/>
                        </Col>
                    </Row>
                </div>
        )
    }
}