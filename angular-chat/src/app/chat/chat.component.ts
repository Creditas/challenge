import { Component, OnInit } from '@angular/core';
import { Message } from './Message';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private conversationHistory: Message[]= [];
  private clientMessage: string = '';

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.getAllMessages();
    this.watchNewMessages();
  }

  getAllMessages() {
    console.log(this.chatService.getAll())
    this.conversationHistory = this.chatService.getAll();
  }

  watchNewMessages() {
    this.chatService.onNewMessageIsAvaiable$
      .subscribe( (messageListUpdated: Message[]) => {
        this.getAllMessages();
      });
  }

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
