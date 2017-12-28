class MessageList {
    constructor () {
        // Instanciando lista de mensagens
        this._messageList = []
    }
    
    /**
     * getMessages
     * Busca todas as mensagens da lista
     * 
     * @return {array} Lista de mensagens
     */
    getMessages () {
        return [].concat(this._messageList)
    }
    
    /**
     * setNewMessage
     * Insere uma nova mensagem à lista de mensagens
     * 
     * @param {string} Nova Mensagem
     */
    setNewMessage (newMessage) {
        this._messageList.push(newMessage)
    }
}