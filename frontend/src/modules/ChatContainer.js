import DOMHandler from "./DOMHandler";

const ChatContainer = class {
  constructor() {
    this.container = DOMHandler.getElement(".chat-container");
    this.menu = this.container.firstChild.nextSibling;
  }

  loadChats(chats = []) {
    chats.forEach(chat => {
      addChat.call(this,chat);
      setActiveChat.call(this,chats,chat);
    });
  }
};

function addChat(chat) {
  this.container.appendChild(chat.getChatElement());
  this.menu.appendChild(chat.getMenuButton());
}

function setActiveChat(chats, chat) {
  if (chat.getId() !== chats[0].getId()) {
    DOMHandler.hideElement(chat.getChatElement());
  } else {
    DOMHandler.activateButton(chat.getMenuButton(), 'chat-bar-item');
    chat.getInputMessage().focus();
  }
}

export default ChatContainer;
