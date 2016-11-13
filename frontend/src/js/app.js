import { Util } from "./helpers/util"
import { MessageView } from "./views/messageView"
import { MessageSender } from "./services/messageSender"

class App {
	constructor(messengerId){
		let chatUi = Util.getElement(messengerId)

		if( chatUi == undefined){
			console.log("Error: unable to connect to chat ui")
			return
		}

		this.getMessageList(chatUi)
		this.getMessageInput(chatUi)
	}

	getMessageList(chatUi){
		let messageList = Util.getElement(".message-list", chatUi)

		if(messageList == undefined){
			throw new Error("Unable to connect to message list");
		}

		let messageView = new MessageView(messageList)
		messageView.append({sender: "SYSTEM", message: "Welcome", sent: false})
	}

	getMessageInput(chatUi){
		let messageInput = Util.getElement(".message-input", chatUi)
		new MessageSender(messageInput, chatUi)

	}
}

var app = new App("#tsc")
var app2 = new App("#vls")
