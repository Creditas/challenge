import { PubSub } from 'pubsub-js';

import { ChatView } from './ChatView';
import { ChatModel } from './ChatModel';
import { Message } from './Message';

// Controls and bind the chat model and view
export class ChatController {

  constructor(selectorplaceholder) {

    // instanciates the model and view
    this.model = new ChatModel();
    this.view = new ChatView(selectorplaceholder);
  }

  // calls all main functions to be run at the beginning
  init() {
    
    this.model.init();
    this.view.init();
    this.onNewClientMessage();
    this.onNewChatMessage();
  }

  // subscribes to new user messages from the view
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

  // subscribes to any possibile messages from client or server and update the view
  onNewChatMessage() {

    PubSub.subscribe('newChatMessage', (msg, messageListUpdated) => {
      this.view.render(messageListUpdated);
    })
  }
}