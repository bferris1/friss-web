import React from 'react';
import Auth from './AuthCtrl';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            team: null
        };
    }

    componentDidMount() {

        // Fetch team data.
        Auth.get('/api/team').then((response) => {
            if (response.success) {
                this.setState({ team : response.team });
            }
        });
    }

    render() {

        let teamMessage = null;
        if (this.state.team) {
            teamMessage = (
                <h5>{'Team : ' + this.state.team['name']}</h5>
            );
        } else {
            teamMessage = (
                <h5>{'You are currently not on any team.'}</h5>
            );
        }

        return (
            <div>
                <h1>Welcome</h1>
                {teamMessage}

                <h6>Team</h6>
                <p>Use the Team page to configure your team settings.</p>

                <h6>Events</h6>
                <p>Use the Event page to add an Event your team will be attending.</p>

                <h6>Games</h6>
                <p>Use the Game page to create a Game and define the set of Metrics you would like your Scouting Analyzer to use.</p>

                <h6>Account</h6>
                <p>Use the Account page to modify your account settings.</p>
            </div>
        );
    }
}