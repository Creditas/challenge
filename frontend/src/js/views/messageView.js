import { View } from "./view.js"

export class MessageView extends View{

	constructor(elemento){
		super(elemento)
	}
	

	template(model)
	{
		let sentClass = model.sent ? "sent" : "received"
		let error = model.error ? " error" : ""
		return `<li class="${sentClass}${error}">
					<span class="sender">${model.sender}: </span> 
					${model.message}
				</li>`
	}
}


