class ChatView {
  render(el) {
    const template = document.getElementById(el).innerHTML = `<ul class="message-list"></ul>

      <div class="message-input">
        <input type="text" />
        <button type="submit">Enviar</button>
      </div>`;

      return template;
  }
}
