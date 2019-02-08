class Message {

 constructor(msg){
   this.msg = msg
   this.msgStatus = "not sent"
  }

  createMessage (msg) {
    const li = document.createElement("li")
    li.classList.add("message")
    const messageContent = document.createElement('p')  
    const listOfMessages = document.querySelector('.messages__list')
    messageContent.textContent = msg
    
    const deleteMessage = document.createElement("span")
    deleteMessage.textContent = "x"
    deleteMessage.classList.add("del-btn")
    deleteMessage.addEventListener('click', () => this.deleteMessage())
    
    this.listItem = li
    li.appendChild(deleteMessage)
    li.appendChild(messageContent)
    listOfMessages.appendChild(li)
       
  }
  
  deleteMessage() {
    this.listItem.remove()
    this.msgStatus = "deleted"
  }
}






