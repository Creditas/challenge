class ChatMessage {
	constructor(id, el) {
		this.id = id;
		this.el = el;

		debugger;
		this.chatView = new ChatView(this.el);
		this.chatView.addEventListener('submit', this.__sendMessage.bind(this));
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