export class ChatView {

  constructor(selectorPlaceholder) {

    this.dom = document.querySelector(selectorPlaceholder);
  }

  init() {

    this.render();
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

      <div class="message-input">
        <input type="text" />
        <button type="button">Enviar</button>
      </div>
    </div>
    `
  }

}