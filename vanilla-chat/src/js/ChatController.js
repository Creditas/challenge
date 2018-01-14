import { PubSub } from 'pubsub-js';

import { ChatView } from './ChatView';
import { ChatModel } from './ChatModel';
import { Message } from './Message';

export class ChatController {

  constructor(selectorplaceholder) {

    this.model = new ChatModel();
    this.view = new ChatView(selectorplaceholder);
  }

  init() {
    
    this.model.init();
    this.view.init();
    this.onNewClientMessage();
    this.onNewChatMessage();
  }

  onNewClientMessage() {
    PubSub.subscribe('newClientMessage', (msg, clientMessage) => {
      
      let clientMsg = new Message(
        clientMessage,
        new Date(),
        'client'
      );

      this.model.addMessage(clientMsg);
    })
  }

  onNewChatMessage() {
    PubSub.subscribe('newChatMessage', (msg, messageListUpdated) => {
      console.log(messageListUpdated)
      this.view.render(messageListUpdated);
    })
  }
}