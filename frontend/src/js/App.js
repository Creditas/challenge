class App {
    constructor () {
        // Criando lista de mensagens
        this._messageList = new MessageList()
        
        // Instanciando controladores
        this._messageListController = new MessageListController(this._messageList)
        this._messageFormController = new MessageFormController(this._messageList)
    }
    
    /**
     * Inicializa a aplicação
     */
    start () {
        
        // Vinculado a função que irá adicionar a mensagem á lista de mensagens e atualizar o elemento
        document.querySelector('.message-form').addEventListener('submit', (event) => {
            // Prevenindo o comportamento padrão
            event.preventDefault()
            
            // Chamando métodos
            this._messageFormController.submitForm.call(this._messageFormController)
            this._messageListController.updateMessageList.call(this._messageListController)
        })
    }
}