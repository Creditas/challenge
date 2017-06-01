class ChatView {
  render(el, id = 0) {
    document.getElementById(el).innerHTML = `<ul class="message-list"></ul>

                    <div class="message-input">
                      <input type="text" />
                      <button type="button">Enviar</button>
                    </div>`;
  }
}