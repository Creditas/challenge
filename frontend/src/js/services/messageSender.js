import { Util } from "../helpers/util"
import { MessageView } from "../views/messageView"
export class MessageSender{

	constructor(element, chatUi){
		if(element == undefined){
			throw new Error("Unable to conect to sender ui")
		}
		this.chatUi = chatUi
		this.init(element)
	}

	init(element){
		this.observe(element)
	}

	observe(element){
		this.element = Util.getElement("#message", element)
		this.sendButton = Util.getElement("button", element)
		this.handleFocusObserer()
	}

	handleFocusObserer(){
		this.sendButton.addEventListener('click', this.sendMessage.bind(this))
		this.element.addEventListener('focus', this.observeIfFocused.bind(this))
		this.element.addEventListener('blur', this.observeIfNotFocused.bind(this))
	}

	observeIfFocused(){
		this.element.addEventListener('keyup', this.observeKeys.bind(this))
	}

	observeIfNotFocused(){
		this.element.removeEventListener('keyup', this.observeKeys)
	}

	observeKeys(event){
		if(event.keyCode == 13 && this.element.value.length){
			this.sendMessage()
		}
	}

	sendMessage() {
		let message = this.element.value
		
		if(message.length <=0){
			return
		}

		let messageView = new MessageView(Util.getElement(".message-list", this.chatUi))

		messageView.append({
			sender: "Me",
			message: this.element.value,
			sent: true
		})

		this.element.value = ""
		console.log(message)
	}
}