import { Injectable, EventEmitter } from '@angular/core';
import { Message } from './chat/Message';

@Injectable()
export class ChatService {
  onNewMessageIsAvaiable$: EventEmitter<Message[]> = new EventEmitter();
  conversationHistory: Message[] = [];

  constructor() { }

  getAll(): Message[] {
    return [].concat( this.conversationHistory );
  }

  sendAll() {

  }

  addMessage(msg: Message) {
    this.conversationHistory.push(msg);
    this.onNewMessageIsAvaiable$.emit( this.conversationHistory );
  }
}
