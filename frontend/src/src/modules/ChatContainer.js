import DOMHandler from "./DOMHandler";

export class ChatContainer {
    constructor(containerNode) {
        this.container = containerNode;
        this.menu = containerNode.firstChild.nextSibling;
    };

    loadChats(chats) {
        for (let chat of chats) {
            this.addChat(chat);

            if (chat.getId() !== chats[0].getId()) {
                DOMHandler.hideElement(chat.getChatElement());
            } else {
                DOMHandler.activateButton(chat.getMenuButton(), 'chat-bar-item');
                chat.getInputMessage().focus();
            }
        }
    };

    addChat(chat) {
        this.container.appendChild(chat.getChatElement());
        this.menu.appendChild(chat.getMenuButton());
    }
}

export default ChatContainer;
