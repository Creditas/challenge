'use strict';

import { CHAT_TEMPLATE } from './../templates';

class ChatComponent {
  constructor(chat, store){
    this.uuid = chat.uuid;
    this.messages = chat.messages;
    this.store = store;
    this.element = this.getElement();
  }

  onMessageSubmit(event) {
    event.preventDefault();

    this.store.dispatch({
      type: 'ADD_MESSAGE',
      message: event.target.querySelector('input').value,
      chatUuid: this.uuid
    } );

    event.target.querySelector('input').value = '';
  }

  addFormEvent(element){
    let form = element.querySelector('.message-form');
    let onMessageSubmit = evt => this.onMessageSubmit(evt);
    form.addEventListener('submit', onMessageSubmit);
    return element;
  }

  getElement() {
    let element = document.createElement('div');
    element.id = this.uuid;

    element.innerHTML = CHAT_TEMPLATE;
    element = this.addFormEvent(element);

    return element;
  }
}

export { ChatComponent };
