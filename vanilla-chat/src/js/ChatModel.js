import { PubSub } from 'pubsub-js';

// Holds all data from server and run time events
export class ChatModel {

  constructor() {
    // list of the chat current history
    this.historyMessageList = [];
  }

  // could be used to initialize some main functions
  init() {
    
  }

  // return a copy of all current messages 
  getAllMessages() {

    return [].concat( this.historyMessageList );
  }

  // could be used to send data to server
  sendAllMessages() {

  }

  // add any message at the history and tells everybody about it
  addMessage(msg) {

    if( msg.content && msg.date && msg.sender ) {

      this.historyMessageList.push(msg);
      PubSub.publish('newChatMessage', this.getAllMessages());
    }
    else {
      throw new Error('The argument needs to be a Message instance.');
    }
  }

  // clean the chat history
  cleanAllMessages() {
    this.historyMessageList = [];
  }
}