class Chat {

  constructor() {
    this.sendMessageButton = document.querySelector("#sendMessage")
    this.input =  document.querySelector("input")
    this.messageList = document.querySelector('.messages__list')
    this.eventListenerToSendMessage()
  }

  sendMessage() {
      if (!this.input.value) return false
      const message = new Message(this.input.value)
      message.createMessage(this.input.value)
      message.msgStatus = "sent"
      this.input.value = ""
      this.input.focus()
      this.scrollDownAutomatically()
  }

  eventListenerToSendMessage() {
    this.input.addEventListener("keyup", (e) => {
      e.preventDefault()
      if(event.keyCode === 13) this.sendMessage()
    })
    this.sendMessageButton.addEventListener("click", () => this.sendMessage())
  }

  scrollDownAutomatically() {
    if (this.messageList) {
      this.messageList.scrollTop = this.messageList.scrollHeight
    } else if (this.messageList.scrollTop + this.messageList.clientHeight === this.messageList.scrollHeight) {
      this.messageList.scrollTop = this.messageList.scrollHeight
    }
  }
  
}

new Chat()