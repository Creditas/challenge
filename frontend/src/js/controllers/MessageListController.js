class MessageListController {
    constructor (messageList) {
        this._messageListElement = document.querySelector('.message-list')
        
        this._messageList = messageList
        
        this.updateMessageList()
    }
    
    /**
     * updateMessageList
     * Atualiza o elemento de lista de mensagens
     */
    updateMessageList () {
        this._messageListElement.innerHTML = this._messageList.getMessages().map((message) => `<li>${ message }</li>`).join('')
    }
}