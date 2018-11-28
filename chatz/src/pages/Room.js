import React, { Component } from 'react'

import Header from '../components/Header'
import Chat from '../components/Chat'
import store from '@/store'
import { connect } from 'react-redux'
import logChat from '@/actions/logChat'
import chat from '@/images/chat.svg'

const mapStateToProps = state => {
  return {
		username: state.username,
		chat: state.room
  }
}
class Room extends Component {
	componentWillUnmount() {
		store.dispatch(logChat.clear())
	}

	newChat = () => {
		alert('aaaaaaaaa')
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
					<Chat chatID={this.props.chat.id} />
				</div>
			</div>
		)
	}
}

export default connect(
  mapStateToProps
)(Room)
