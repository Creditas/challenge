import Chat from './chat'

class Messenger {
  constructor () {
    this.chats = {}
    this.lenght = 0
  }

  chatInit (messageList) {
    const id = this.__generateId()

    this.chats[id] = new Chat({
      id: id,
      messageList: messageList
    })
    this.lenght++
    return id
  }

  __generateId () {
    return (this.lenght + 1).toString() // Exemplo
  }
}

export default new Messenger()
