import pubSub from 'pubsub-js'

export default class Chat {
  constructor (chat) {
    this.id = chat.id
    this.messageList = chat.messageList
    this.active = true
    this.channel = pubSub.subscribe(
      this.id,
      this.addMessage.bind(this)
    )
    // Podem ser incluídas mais informações aqui, como nome e ids dos usuários,
    // data e hora em que o chat foi iniciado, etc
  }

  addMessage (channel, data) {
    const node = document.createElement('li')
    const textnode = document.createTextNode(data)

    node.className = 'message-item'
    node.appendChild(textnode)
    this.messageList.insertBefore(node, this.messageList.firstChild)
  }

  leaveChat () {
    this.active = false
    pubSub.unsubscribe(this.channel)
  }
}
