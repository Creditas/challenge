class MessageFormController {
    constructor (messageList) {
        this._messageList = messageList
        
        // Instanciando elemento
        this._messageFormElement = document.querySelector('.message-form')
    }
    /**
     * submitForm
     * Submete o formulário de mensagens
     */
    submitForm () {
        // Adicionando nova mensagem ao modelo
        this._messageList.setNewMessage(this._messageFormElement.messageInput.value)
        
        // Limpando valor do elemento
        this._messageFormElement.messageInput.value = ''
        
        // Definindo o foco para o elemento
        this._messageFormElement.messageInput.focus()
    }
}