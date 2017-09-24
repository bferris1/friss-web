import React, { Component } from 'react';

export default class Login extends Component{

    render() {
        return(
            <div class="container">
                <img class="login_logo" src="https://i.imgur.com/WawaXKU.png" alt="FRISS"/>
                <form onSubmit={this.handleLoginSubmit}>
                    <input type="text" placeholder="Email" />
                    <input type="text" placeholder="Password" />
                    <input type="Submit" value="Login" />
                </form>
            </div>
        )
    }
}