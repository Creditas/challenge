/*
 * This class is an initializer only of
 * the message wrapper. It can be used
 * in the future as an entry point for
 * API communications.
 *
 * @param Integer
 * @param String
 */

class ChatApp {
	constructor(id, el) {
		this.el = el;
		this.id = id;

		this.chat = new ChatMessage(this.el);
	}

	retrieveHistory() {
		/* This initializer class being completely
		 * indepenent from the message handler and
		 * the view, it's possible to have such
		 * method (retrieveHistory) in order to
		 * load external resources.
		 */
	}
}