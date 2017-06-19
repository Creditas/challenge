import ChatView from './chatview';
import Utils from './utils';
import LocalStorage from './localStorage';

class Chat{
    constructor(options){
        this.placeholder = document.querySelector(options.placeholder);
        if(this.placeholder === undefined) return 'Opsss';

        this.chatView = new ChatView(this.placeholder);

        this.utils = new Utils();

        this.utils.getById(this.chatView.id)
            .querySelector('.message-input button')
            .addEventListener('click', this.sendMessage.bind(this));

        this.utils.getById(this.chatView.id).addEventListener('keypress', this.bindEnter.bind(this));

        this.local = new LocalStorage(options.chatType);
        this.local.getLog().map((value) => {
            this.createContainer(value)
        });
    };
    sendMessage(event){
        event.preventDefault();

        let input = this.utils.getById(this.chatView.id)
            .querySelector('.message-input input');

        this.createContainer(input.value, true);

        input.value = '';
    };
    createContainer(message, populate){
        if(message == '') return ;

        let createMessage = document.createElement('li');
        createMessage.innerHTML = message;

        this.utils.getById(this.chatView.id)
            .querySelector('.message-list')
            .appendChild(createMessage);

        if(populate) this.local.setLog(message);
    };
    bindEnter(event){
        let e = event || window.event;
        switch(e.which || e.keyCode){
        case 13 :
            e.preventDefault();
            this.sendMessage(event);
        }
    }
}

export default Chat;
