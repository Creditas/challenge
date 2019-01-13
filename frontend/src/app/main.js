(function(){
    const Chat = require('./chat/chat')
    const chat = new Chat();

    /**
     * @method appendMessage
     * Adiciona as mensages na <ul>
     */
    const appendMessage = (message, send) => {
        let newListElement = document.createElement('li');
        if(send) {
            newListElement.setAttribute('class', 'send');
        }
        newListElement.innerText = message;
        document.querySelector('.message-list').appendChild(newListElement);
    };

    /**
     * @method clearInput
     * Limpa o input
     */
    const clearInput = () => {
        document.querySelector('.message-input input').value = '';
    }

    /**
     * @method sendAndSetMessage
     * Envia a messagem digitada pelo usuário 
     */
    const sendAndSetMessage = () => {
        let inputMessage = document.querySelector('.message-input input').value;
        chat.sendMessage(inputMessage);
        appendMessage(inputMessage, true);
        clearInput();
    }

    /**
     * @method setEvents
     * Seta os eventos
     */
    const setEvents = () => {
        document.querySelector('.message-input button').addEventListener('click', () => {
            sendAndSetMessage();
        });

        document.querySelector('.message-input input').addEventListener('keyup', (event) => {
            if(event.keyCode === 13) {
                sendAndSetMessage();
            }
        });
    };

    /**
     * @method init
     * Inicia todos os eventos 
     */
    const init = () => {
        setEvents();
    };

    try{
        init();
    }catch(err) {
        console.error(err);
    }
}());