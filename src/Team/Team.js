import React, { Component } from 'react';
import uuid from 'uuid';
import {Button} from 'reactstrap';
import NewTeamForm from '../NewTeamForm';
import TeamCardGrid from '../TeamCardGrid';

export default class Team extends Component {
    constructor() {
        super();

        this.state = {
            showNewTeamForm: false,
            teams: []
        }

        this.handleAddTeam = this.handleAddTeam.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleButtonClick() {
        this.setState({showNewTeamForm: true});
    }

    handleAddTeam(team) {

        let teams = this.state.teams;
        team.id = uuid.v4();
        teams.push(team);

        this.setState({teams: teams});
        this.setState({showNewTeamForm: false});

        // TODO: Connect to backend.
    }

    render() {

        let newTeamButton = <Button color="link" name="showNewTeamForm" value="true" onClick={this.handleButtonClick}>
            Add New Team</Button>
        let newTeamForm = null;

        if (this.state.showNewTeamForm) {
            newTeamButton = null;
            newTeamForm = <NewTeamForm addTeam={this.handleAddTeam} />
        }

        return (
            <div className="Team">
                <h1>View Teams</h1>
                {newTeamButton}
                {newTeamForm}
                <TeamCardGrid teams={this.state.teams}/>
            </div>
        )
    }
}