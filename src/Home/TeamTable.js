import React from 'react';
import { Table } from 'reactstrap';
import Auth from '../AuthCtrl';

export default class TeamTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            teamMembers: []
        };
    }

    componentDidMount() {
        
    }

    render() {
        let teamMembers = this.state.events.map((member, index) => {
            return (
                <tr>
                    <td key = {index}>{member.name}</td>
                </tr>
            );
        });

        return (
            <div>
                <h3>Your Team Members</h3>
                <Table>
                    <tbody>
                    {teamMembers}
                    </tbody>
                </Table>
            </div>
        );
    }
}
