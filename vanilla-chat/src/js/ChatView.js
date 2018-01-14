import { PubSub } from 'pubsub-js';
import { Message } from './Message';

export class ChatView {

  constructor(selectorPlaceholder) {

    this.dom = document.querySelector(selectorPlaceholder);
  }

  init() {

    this.render();
    this.handlingUserEvents();
  }

  handlingUserEvents() {

    this.dom.addEventListener('submit', (e) => {
      
      e.preventDefault();

      let input = this.dom.querySelector('.message-input input');
      PubSub.publish('newClientMessage', input.value);
      input.value = '';
    })
  }

  render(messageList) {
    this.dom.innerHTML = this.getTemplate(messageList || []);
  }
  
  getTemplate(messageList) {

    return `
    <h1>Chat</h1>
    
    <div class="messages">
      <ul class="message-list">
        ${
          messageList.map( message => `<li>${ message.getContent() }</li>` )
            .join('')
        }
      </ul>

      <form class="message-input">
        <input type="text" required/>
        <button type="submit">Enviar</button>
      </form>
    </div>
    `
  }

}