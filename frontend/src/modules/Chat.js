import DOMHandler from "./DOMHandler";
import Message from "./Message";

const Chat = class {
  constructor(id) {
    this.id = id;
    this.createChatElement();
    this.buildChatElement();
    this.buildMenuButton();
    addListeners.call(this);
  }

  createChatElement() {
    this.chat = DOMHandler.createElementWithClass("div", "chat");
    this.messageContainer = DOMHandler.createElementWithClass("div", "message-container");
    this.messageBoard = DOMHandler.createElementWithClass("ul", "message-board");
    this.inputGroup = DOMHandler.createElementWithClass("div", "message-input-group");
    this.inputMessage = DOMHandler.createElementWithClass("input", "input-message");
    this.sendButton = DOMHandler.createElementWithClass("button", "btn-send-message");
  }

  buildChatElement() {
    this.chat.appendChild(this.messageContainer);
    this.messageContainer.appendChild(this.messageBoard);
    this.messageContainer.appendChild(this.inputGroup);
    this.inputGroup.appendChild(this.inputMessage);
    this.inputGroup.appendChild(this.sendButton);
    this.sendButton.appendChild(document.createTextNode("Enviar"));
    this.chat.setAttribute("id", this.id);
    this.inputMessage.maxLength = 42;
  }

  buildMenuButton() {
    this.menuButton = DOMHandler.createElementWithClass("button", "chat-bar-item");
    this.menuButton.appendChild(document.createTextNode(this.id));
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

    message.clearMessage();

    if (message.isEmpty()) return false;

    const messageText = message.getMessage();
    const ul = this.messageBoard;
    const li = DOMHandler.createElementWithClass("li", "message");

    li.appendChild(document.createTextNode(`Você: ${messageText}`));
    ul.appendChild(li);
    ul.scrollTop = ul.scrollHeight - ul.clientHeight;

    return true;
  }
}

function addListeners() {
  this.sendButton.addEventListener("click", () => {
    this.addMessage();
  });

  this.inputMessage.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
      this.addMessage();
    }
  });

  this.menuButton.addEventListener("click", () => {
    DOMHandler.activateButton(this.getMenuButton(), 'chat-bar-item');
    DOMHandler.activateContent(this.getId(), 'chat');
    this.inputMessage.focus();
  });
}

export default Chat;
