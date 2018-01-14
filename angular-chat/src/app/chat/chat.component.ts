import { Component, OnInit } from '@angular/core';
import { Message } from './Message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  conversationHistory: Array<Message> = [];

  constructor() { }

  ngOnInit() {
  }

}
