import { Component, OnInit } from '@angular/core';
import { Message } from './Message';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  // list of messages in this current chat
  private conversationHistory: Message[]= [];

  // client message binding to the view
  private clientMessage: string = '';

  // independency injection of chat service
  constructor(private chatService: ChatService) { }

  // methods to be ran where the app is ready
  ngOnInit() {
    this.getAllMessages();
    this.watchNewMessages();
  }

  // get the list of messages from the chat service
  getAllMessages() {
    this.conversationHistory = this.chatService.getAll();
  }

  // event bound when new messages arrive at the list of this chat
  watchNewMessages() {
    this.chatService.onNewMessageIsAvaiable$
      .subscribe( (messageListUpdated: Message[]) => {
        this.getAllMessages();
      });
  }

  // add a new client message in the stack
  addClientMessage(e) {
    e.preventDefault();

    let msg = new Message(
      this.clientMessage,
      new Date(),
      'client'
    );

    this.clientMessage = '';

    this.chatService.addMessage(msg);
  }
}
