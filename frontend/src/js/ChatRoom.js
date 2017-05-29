const Messages = new MessageCenter();
const generateRandomId = () => `chatId#${Math.floor( Math.random() * 100 )}`;

class ChatRoom {

  constructor(app) {
    this.id = generateRandomId();

    // Carrega histórico de mensagens do chat
    // e o adiciona à lista de chats no MessageCenter
    Messages.history(this);
    Messages.newChatRoom(this);

    // cria novo chat e adiciona à View
    this.chat = new ChatTemplate();
    this.chat.addEventListener('submit', this.sendMessage.bind(this));
    app.appendChild(this.chat);
  }

  addMessage(message) {
    let newMessage = document.createElement('li');
    newMessage.innerText = message;

    this.chat.children[0].appendChild(newMessage);
  }

  sendMessage(event) {
    event.preventDefault();

    let messageText = event.target.text.value;

    // envia mensagem ao MessageCenter e a exibe na View
    if(messageText.trim()) {
      Messages.send(this.id, messageText);
      this.addMessage(messageText);
    }

    event.target.reset();
  }


}
