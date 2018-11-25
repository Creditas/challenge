import React, { Component } from 'react'
import Header from '../components/Header'

class Room extends Component {
	render() {
		return (
			<div className="room">
				<Header />
				<div className="container">
					<h1>Room</h1>
				</div>
			</div>
		);
	}
}

export default Room
