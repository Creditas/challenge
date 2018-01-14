import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './chat/Message';

@Injectable()
export class ChatService {

  // event emitted when new messages comes from the user or server
  onNewMessageIsAvaiable$: EventEmitter<Message[]> = new EventEmitter();

  // list of the entire chat
  conversationHistory: Message[] = [];

  // returns a copy of the chat history
  getAll(): Message[] {
    return [].concat( this.conversationHistory );
  }

  // could be used to send data to server
  sendAll() {

  }

  // add a new message to the stack and emit the tells everybody about it
  addMessage(msg: Message) {
    this.conversationHistory.push(msg);
    this.onNewMessageIsAvaiable$.emit( this.conversationHistory );
  }
}
