import React, {Component} from 'react';
import './Login.css';

export default class Login extends Component {

    render() {
        return (
            <div className="container">
                <center>
                    <div className="image-container">
                    <img className="login_logo" src="https://i.imgur.com/WawaXKU.png" alt="FRISS"/>
                    </div>
                </center>
                <div className="form-container">
                    <form className="form" onSubmit={this.handleLoginSubmit}>
                        <input className="email_text" type="text" placeholder="Email"/>

                        <input type="text" placeholder="Password"/>

                        <center><input type="Submit" value="Login"/></center>
                        <div className="links-container">
                            <a href="/signup">Sign Up</a>

                            <a href="/reset">Forgot Password?</a>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}