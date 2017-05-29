class MessageCenter {

  constructor() {
    this.chatRooms = [];
  }

  // adiciona possíveis novos chats à lista de chats controlados pelo MessageCenter
  newChatRoom(chat) {
    this.chatRooms.push(chat);
  }

  // carrega histórico de mensagens, filtrando pelo id do chat
  history(chatRoom) {
    console.log(`loading history from ${chatRoom.id}...`);
    return [];
  }

  // envia mensagem para o server
  send(chatId, message) {
    console.log(`Message from ${chatId}: "${message}"`);
  }

  // Método para enviar algum tipo de resposta ao chat
  // filtra o chat pelo id e envia resposta  via 'chat.addMessage'
  receive(chatId, message) { }

}
