import Chat from './chat';
import ChatAjax from './chatAjax';

class ChatFactory{
    constructor(options){

        switch(options.chatType){
        case 'normal':
            this.chatClass = new Chat(options);
            break;
        case 'ajax':
            this.chatClass = new ChatAjax(options);
            break;
        }
        return this.chatClass;
    }
}

export default ChatFactory;
