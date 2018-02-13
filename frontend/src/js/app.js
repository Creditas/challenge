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
				<div class="message-input">
					<input type="text" placeholder="Digite sua mensagem..." data-chat-input-id="${id}" />
					<button type="submit"></button>
				</div>
			</form>`;

		document.querySelector(this.selector).innerHTML += markup
	}

	render(id) {
		const messages = this.content[`${id}`]['messages'];
		let markup = ''

		for (var key in messages) {
				if (messages.hasOwnProperty(key)) {
						console.log(key + " -> " + messages[key].text);
						markup += `<li class="wrap-message"><span class="element-message">${messages[key].text}</span></li>`;
				}
		}

		document.querySelector(`ul[data-chat-message-list-id="${id}"]`).innerHTML = markup;
	}

	clear(id) {
		document.querySelector(`input[data-chat-input-id="${id}"]`).value = ''
	}

	getMessage(id) {
		return document.querySelector(`input[data-chat-input-id="${id}"]`).value;
	}

	increaseMessageCount() {
		this.message_id++;
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
		this.render(id);
		this.clear(id);
	}
}

let chat = new Chat('.messages');
module.exports = Chat