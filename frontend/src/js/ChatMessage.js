class ChatMessage {
	constructor(id, el) {
		this.id = id;
		this.el = el;

		this.chatView = new ChatView();
		this.chat = this.chatView.render(this.el);
	}

	__createMessage(message) {
		let createMessage = document.createElement('li');
		createMessage.innerHTML = message;
	}

	__sendMessage(e) {
		// console.log(this);
		let message = e.target.value;

		this.createMessage(message);
	}
}