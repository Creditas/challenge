/*
 * This class is responsible only for
 * handling the chat message, by creating it
 * and sending it using two private methods.
 *
 * @param String
 *
 */

class ChatMessage {
	constructor(el) {
		this.el = el;

		this.chatView = new ChatView(this.el);
		this.chatView.addEventListener('submit', this.__sendMessage.bind(this));
	}

	__createMessage(message) {
		let createMessage = document.createElement('li');
		createMessage.innerHTML = message;

		return createMessage;
	}

	__sendMessage(e) {
		e.preventDefault();

		const messageContent = e.target.message.value;
		const message = this.__createMessage(messageContent);
		const messagesContainer = this.chatView.children[0];

		if (messageContent) {
			messagesContainer.appendChild(message);
		}
		
		e.target.reset();
	}
}