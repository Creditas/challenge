'use strict';

import { ChatComponent } from './ChatComponent';

class ChatListComponent {
  constructor(store){
    this.store = store;
    this.element = document.createElement('div');
    this.element.id = 'chatList';

    this.store.subscribe((chatUuid, message) => {
      this.addMessage(chatUuid, message);
    } );
  }

  addMessage(chatUuid, message) {
    let messageItem = document.createElement('li');
    messageItem.textContent = message;

    this.element.childNodes.forEach( childNode => {
      if(childNode.id === chatUuid)
        childNode.querySelector('.message-list').appendChild(messageItem);
    } );
  }

  render(rootElement) {
    this.store.getState().forEach( (chat) => {
      let chatItem = new ChatComponent(chat, this.store);
      this.element.appendChild( chatItem.element );
    } );
    rootElement.appendChild(this.element);
  }
}

export { ChatListComponent };
