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
    console.log(e)

    let msg = new Message(
      'teste',
      new Date(),
      'client'
    );

    this.chatService.addMessage(msg);
  }
}
