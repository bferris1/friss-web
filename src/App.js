import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Account from './Account';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h2>Welcome to React</h2>
                    </div>
                    <Route path="/account" component={Account}/>
                </div>
            </Router>
        );
    }
}

export default App;
