class ChatApp {
	constructor(id, el) {
		this.el = el;
		this.id = id;

		this.chat = new ChatMessage(this.el);
	}
}