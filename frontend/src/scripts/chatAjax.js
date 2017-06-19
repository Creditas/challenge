import Chat from './chat';

class ChatAjax extends Chat{
    constructor(options){
        super(options);
    }
    sendMessage(event){
        console.log("Event com delay para simular outra implementacao");

        setTimeout(() => {
            event.preventDefault();

            let input = this.utils.getById(this.chatView.id)
                .querySelector('.message-input input');

            this.createContainer(input.value, true);

            input.value = '';
        }, 1000);
    }
}

export default ChatAjax;
