import React, { Component } from 'react';
import uuid from 'uuid';
import {Button} from 'reactstrap';

export default class Team extends Component {

    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
        this.handleAddTeam = this.handleAddTeam.bind(this);
        this.addTeam = this.handleAddTeam(this);
        this.state = {
            addTeam: false,
            teams: []
        }
    }

    handleChange(e) {
        this.setState({[e.target.name] : e.target.value});
        console.log(this.state);
    }


    handleAddTeam(team) {

        console.log(team);
    }

    render() {

        let newForm = null;
        let newFormLink = <Button color="link" name={"addForm"} value={true} onClick={this.handleChange}>Add A New Team</Button>
        if (this.state.addForm) {

        }

        return (
            <div className="Team">
                <h1>Create Team</h1>
                {newFormLink}
                {newForm}
            </div>
        )
    }
}