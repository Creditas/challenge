class ChatView {
  constructor(el) {
    this.template = document.createElement('form');
    this.template.innerHTML = `<ul class="message-list"></ul>

      <div class="message-input">
        <input type="text" name="message" />
        <button type="submit">Enviar</button>
      </div>`;

    document.getElementById(el).appendChild(this.template);

    return this.template;
  }
}

