import DOMHandler from "./DOMHandler";
import Message from "./Message";

class Chat {
    constructor(id) {
        this.id = id;
        this.buildChatElement();
        this.buildMenuButton();
        this.addListeners();
    }

    buildChatElement() {
        this.chat = DOMHandler.createElementWithClass("div", "chat");
        this.messageContainer = DOMHandler.createElementWithClass("div", "message-container");
        this.messageBoard = DOMHandler.createElementWithClass("ul", "message-board");
        this.inputGroup = DOMHandler.createElementWithClass("div", "message-input-group");
        this.inputMessage = DOMHandler.createElementWithClass("input", "input-message");
        this.sendButton = DOMHandler.createElementWithClass("button", "btn-send-message");
        this.chat.appendChild(this.messageContainer);
        this.messageContainer.appendChild(this.messageBoard);
        this.messageContainer.appendChild(this.inputGroup);
        this.inputGroup.appendChild(this.inputMessage);
        this.inputGroup.appendChild(this.sendButton);
        this.sendButton.appendChild(document.createTextNode("Enviar"));
        this.chat.setAttribute("id", this.id);
    }

    buildMenuButton() {
        this.menuButton = DOMHandler.createElementWithClass("button", "chat-bar-item");
        this.menuButton.appendChild(document.createTextNode(this.id))
    }

    getId() {
        return this.id;
    }

    getChatElement() {
        return this.chat;
    }

    getMenuButton() {
        return this.menuButton;
    }

    getInputMessage() {
      return this.inputMessage;
    }

    addMessage() {
        const message = new Message(this.inputMessage);
        const messageText = message.getMessage();

        if (!message.isEmpty()) {
            const ul = this.messageBoard;
            const li = DOMHandler.createElementWithClass("li", "message");

            li.appendChild(document.createTextNode(`Você: ${messageText}`));
            ul.appendChild(li);
            ul.scrollTop = ul.scrollHeight - ul.clientHeight;
        }

        message.clearMessage();
    }

    addListeners() {
        this.sendButton.addEventListener("click", function () {
            this.addMessage();
        }.bind(this));

        this.inputMessage.addEventListener("keypress", function (e) {
            if (e.keyCode === 13) {
                this.addMessage();
            }
        }.bind(this));

        this.menuButton.addEventListener("click", function () {
            DOMHandler.activateButton(this.getMenuButton(), 'chat-bar-item');
            DOMHandler.activateContent(this.getId(), 'chat');
            this.inputMessage.focus();
        }.bind(this));
    }
}

export default Chat;
