import React, { Component } from 'react'

import Header from '../components/Header'
import Chat from '../components/Chat'
import store from '@/store'
import logChat from '@/actions/logChat'

class Room extends Component {
	componentWillUnmount() {
		store.dispatch(logChat.clear())
	}

	render() {
		return (
			<div className="room">
				<Header />
				<div className="container content">
					<Chat />
				</div>
			</div>
		)
	}
}

export default Room
