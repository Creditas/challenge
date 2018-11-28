import React, { Component } from 'react'

import Header from '../components/Header'
import Chat from '../components/Chat'
import store from '@/store'
import { connect } from 'react-redux'
import logChat from '@/actions/logChat'
import chat from '@/images/chat.svg'

const mapStateToProps = state => {
  return {
		username: state.username
  }
}
class Room extends Component {
	constructor(props) {
		super(props)

		this.state = {
			activeChats: store.getState().rooms
		}

		this.renderChat = this.renderChat.bind(this)
	}

	componentWillUnmount() {
		store.dispatch(logChat.clear())
	}

	newChat = () => {
		const chatID = prompt('Digite o ID da sala:')
		if (chatID) {
			store.dispatch(logChat.createRoom(chatID))
		} else {
			return false
		}
	}

	componentDidMount() {
		const self = this
		store.subscribe(() => {
			self.setState({
				activeChats: store.getState().rooms
			})
		})
	}

	renderChat = () => {
		const state = store.getState()
		console.log(state, '<----')
		return (
			this.state.activeChats.map(e => {
				return (
					<Chat chatID={e.id} key={e.id} />
				)
			})
		)
	}

	render() {
		return (
			<div className="room">
				<Header />
				<div className="container action-content">
					<div className="newChat-btn" onClick={this.newChat}>
						<img src={chat} alt=""/>
						Novo chat
					</div>
				</div>

				<div className="container content">
					{
						this.renderChat()
					}
				</div>
			</div>
		)
	}
}

export default connect(
  mapStateToProps
)(Room)
