import React, { Component } from 'react'

import Header from '../components/Header'
import Chat from '../components/Chat'

class Room extends Component {
	render() {
		return (
			<div className="room">
				<Header />
				<div className="container content">
					<Chat />
				</div>
			</div>
		);
	}
}

export default Room
