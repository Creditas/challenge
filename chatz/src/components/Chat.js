import React, { Component } from 'react'

import Message from '../components/Message'
import SendBtn from '@/images/send-button.svg'

class Chat extends Component {
	constructor(props) {
    super(props)

    this.state = {
			message: ''
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
		document.querySelector('.input-msg').value = ''
		console.log(message)
	}

	render() {
			return (
					<div className="chat">
							<div className="chat__messages">
								<Message name="Andreolle" owner="mine" message="Bláblá" />
								<Message name="Pedro" owner="theirs" message="loremjshdj hjashdkjahskdjhaskdjhaskdjahsdkjashdjkasdasdas" />
								<Message name="Andreolle" owner="mine" message="Bláblá" />
								<Message name="Pedro" owner="theirs" message="asdasdasda" />
							</div>

							<form className="chat__typingarea" onSubmit={this.send}>
								<input type="text" className="input-msg" onChange={this.message} placeholder="Digite uma mensagem..." />
								<button type="submit" className="submit-btn">
									<img src={SendBtn} />
								</button>
							</form>
					</div>
			)
	}
}

export default Chat
