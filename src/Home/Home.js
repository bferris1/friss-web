import React from 'react';

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			teamName: 'Team 33'
		}
	}

	render() {
		return (
			<h1>{this.state.teamName}</h1>
			
		);	
	}
}
