import { PubSub } from 'pubsub-js';
import { Message } from './Message';

// Render the chat in the DOM
export class ChatView {

  // 'selectorPlaceholder' is where it should be rendered
  constructor(selectorPlaceholder) {

    this.dom = document.querySelector(selectorPlaceholder);
  }

  // calls all main functions to be run at the beginning
  init() {

    this.render();
    this.handlingUserEvents();
  }

  // Respond to user event in the current chat
  handlingUserEvents() {

    this.dom.addEventListener('submit', (e) => {
      
      e.preventDefault();

      // capture the user message to be sent
      let input = this.dom.querySelector('.message-input input');
      PubSub.publish('newClientMessage', input.value);
      input.value = '';
    })
  }
  
  // return the template of the chat in its current status
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

  // render the chat into HTML
  render(messageList) {
    this.dom.innerHTML = this.getTemplate(messageList || []);
  }
}