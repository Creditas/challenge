import Chat from './chat';

class ChatAjax extends Chat{
    constructor(options){
        super(options);
    }
    sendMessage(event){
        console.log( 'Event da classe Ajax: ', event);
    }
}

export default ChatAjax;
