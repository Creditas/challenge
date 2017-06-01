class ChatMessage {
	constructor(id, el) {
		this.id = id;
		this.el = el;

		this.chatView = new ChatView(this.el);
		this.chatView.addEventListener('submit', this.__sendMessage.bind(this));
	}

	__createMessage(message) {
		debugger;
		let createMessage = document.createElement('li');
		createMessage.innerHTML = message;

		return createMessage;
	}

	__sendMessage(e) {
		e.preventDefault();
		// console.log(this);
		debugger;
		const messageContent = e.target.message.value;
		const message = this.__createMessage(messageContent);

		const messagesContainer = this.chatView.children[0];
		messagesContainer.appendChild(message);

		// document.selectElementById();
	}
}