import React, { Component } from 'react'

import Message from '../components/Message'
import SendBtn from '@/images/send-button.svg'

class Chat extends Component {
    render() {
        return (
            <div className="chat">
								<div className="chat__messages">
									<Message name="Andreolle" owner="mine" message="Bláblá" />
									<Message name="Pedro" owner="theirs" message="loremjshdj hjashdkjahskdjhaskdjhaskdjahsdkjashdjkasdasdas" />
									<Message name="Andreolle" owner="mine" message="Bláblá" />
									<Message name="Pedro" owner="theirs" message="asdasdasda" />
								</div>

								<form className="chat__typingarea">
									<input type="text" className="input-msg" placeholder="Digite uma mensagem..." />
									<button type="submit" className="submit-btn">
										<img src={SendBtn} />
									</button>
								</form>
            </div>
        )
    }
}

export default Chat
