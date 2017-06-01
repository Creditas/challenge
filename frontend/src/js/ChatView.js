class ChatView {
  constructor(el) {
    this.template = document.getElementById(el).innerHTML = `<ul class="message-list"></ul>

      <div class="message-input">
        <input type="text" />
        <button type="submit">Enviar</button>
      </div>`;

      return this.template;
  }
}
