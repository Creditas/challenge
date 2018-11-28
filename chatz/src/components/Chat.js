import React, { Component } from 'react'

import Message from '../components/Message'
import SendBtn from '@/images/send-button.svg'
import { connect } from 'react-redux'
import store from '@/store'
import logChat from '@/actions/logChat'

const mapStateToProps = state => {
  return {
		username: state.username
  }
}

class Chat extends Component {
	constructor(props) {
    super(props)

    this.state = {
			message: '',
			chatLog: []
		}

		this.message = this.message.bind(this)
		this.send = this.send.bind(this)
		this.renderMessages = this.renderMessages.bind(this)
		this.logMessages = this.logMessages.bind(this)
	}

	message = (e) => {
		this.setState({
			message: e.target.value
		})
	}

	send = (event) => {
		event.preventDefault()
		const message = this.state.message
		const username = this.props.username
		const id = this.props.chatID
		this.autoScroll()

		if (message.length !== 0) {
			store.dispatch(logChat.message(message, username, 'mine', id))
			this.logMessages(id)
		}

		event.target.querySelector('input').value = ''
		this.setState({ message: '' })
	}

	logMessages = (id) => {
		const rooms = store.getState().rooms
		const findRoom = rooms.find(e => e.id === id)

		this.setState({
			chatLog: findRoom.messages
		})
	}

	autoScroll = () => {
		const elem = document.querySelector('.chat__messages')
		setTimeout(() => {
			elem.scrollTop = elem.scrollHeight
		}, 100)
	}

	renderMessages = () => {
		const chatLog = this.state.chatLog

		if (chatLog) {
			return (
				chatLog.map((e, key) => {
					return (
						<Message name={e.username} owner={e.sender} message={e.message} key={key} />
					)
				})
			)
		}


	}

	render() {
		return (
			<div className="chat">
					<div className="chat__messages">
						<Message name="" owner="admin" message={`Convide um amigo para entrar usando a ID: ${this.props.chatID}`} />
						{this.renderMessages()}
					</div>

					<form className="chat__typingarea" onSubmit={this.send}>
						<input type="text" className="input-msg" onChange={this.message} placeholder="Digite uma mensagem..." />
						<button type="submit" className="submit-btn">
							<img src={SendBtn} alt="enviar" />
						</button>
					</form>
			</div>
		)
	}
}

export default connect(
  mapStateToProps
)(Chat)
