import React, { Component } from 'react'

import Message from '../components/Message'
import SendBtn from '@/images/send-button.svg'
import store from '@/store'
import logChat from '@/actions/logChat'
import setUser from '@/actions/setUsername'

class Chat extends Component {
	constructor(props) {
    super(props)

    this.state = {
			message: '',
			messages: []
		}

		this.message = this.message.bind(this)
    this.send = this.send.bind(this)
	}

	message = (e) => {
		this.setState({
			message: e.target.value
		})
	}

	send = (event) => {
		event.preventDefault()
		const message = this.state.message
		const hash = window.location.hash

		this.autoScroll()

		if (message.length !== 0) {
			store.dispatch(logChat.message(message, hash, 'mine'))
		}

		document.querySelector('.input-msg').value = ''
		this.setState({ message: '' })
	}

	logMessages = () => {
		store.subscribe(() => {
			this.setState({
				messages: store.getState().chatlog.messages
			})
		})
	}

	autoScroll = () => {
		const elem = document.querySelector('.chat__messages')
		setTimeout(() => {
			elem.scrollTop = elem.scrollHeight
		}, 100)
	}

	renderMessages = () => {
		const listMessage = this.state.messages
		return (
			listMessage.map((e, key) => {
				return (
					<Message name={e.username} owner={e.sender} message={e.message} key={key} />
				)
			})
		)
	}

	componentDidMount() {
		this.logMessages()
	}

	render() {
		return (
			<div className="chat">
					<div className="chat__messages">
						<Message name="" owner="admin" message={`Convide um amigo para entrar usando a ID: ${window.location.hash}`} />
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

export default Chat
