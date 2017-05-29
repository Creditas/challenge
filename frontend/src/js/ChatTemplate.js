class ChatTemplate {

  constructor() {
    this.chat = document.createElement('form');
    this.chat.className = 'messages';

    this.chat.innerHTML = `
        <ul class="message-list"></ul>
        <div class="message-input">
          <input type="text" name="text" />
          <button type="submit">Enviar</button>
        </div>
    `;

    return this.chat;
  }

}
