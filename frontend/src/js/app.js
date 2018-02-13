'use strict';

class Chat {
	constructor(selector) {
		this.selector = selector;
		this.chat_count = 0;
		this.content = [];
		this.message_id = 0;
	}

	getCurrentTime() {
		const date = new Date();
		const time = `${date.getHours()}h${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;

		return time;
	}

	create() {
		let id = this.chat_count++;

		this.content[id] = [];
		this.content[id]['messages'] = [];

		let markup = `
			<form class="chat-wrapper" data-chat-wrapper-id="${id}" action="javascript:chat.send(${id})">
				<ul class="message-list" data-chat-message-list-id="${id}"></ul>
				<div class="message-input-container">
					<input type="text" class="message-input" placeholder="Digite sua mensagem..." data-chat-input-id="${id}" />
					<button class="send-button" type="submit"></button>
				</div>
			</form>`;

		this.render(this.selector, markup);
	}

	getMessages(id) {
		return this.content[`${id}`]['messages'];
	}

	render(target, content, increment = true) {
		increment
		? document.querySelector(target).innerHTML += content
		: document.querySelector(target).innerHTML = content;
	}

	buildChatBubbles(id) {
		const messages = this.getMessages(id);
		let markup = ''

		for (var key in messages) {
			if (messages.hasOwnProperty(key)) {
				markup += `<li class="wrap-message"><span class="element-message">${messages[key].text}</span></li>`;
			}
		}

		this.render(`ul[data-chat-message-list-id="${id}"]`, markup, false)
	}

	clear(id) {
		document.querySelector(`input[data-chat-input-id="${id}"]`).value = ''
	}

	getMessage(id) {
		return document.querySelector(`input[data-chat-input-id="${id}"]`).value
	}

	increaseMessageCount() {
		this.message_id++;
		return this.message_id
	}

	storeMessage(id) {
		this.increaseMessageCount();
		const message = this.getMessage(id);

		this.content[`${id}`]['messages'][`${this.message_id}`] = [];
		this.content[`${id}`]['messages'][`${this.message_id}`]['text'] = message;
		this.content[`${id}`]['messages'][`${this.message_id}`]['time'] = this.getCurrentTime();

		// In the future, our application would store data in a server.
	}

	send(id) {
		this.storeMessage(id);
		this.buildChatBubbles(id);
		this.clear(id);

		return true;
	}
}

let chat = new Chat('.messages');
module.exports = Chat