'use strict';


class ChatBox {

    constructor(chatId, store, rootElement, components) {
        this.store = store;
        this.chatId = chatId;
        this.rootElement = rootElement;
        this.components = components;


        this.el = document.createElement('div');
        this.el.id = this.chatId;
        this.el.className += 'chat';

        this.render();
    }

    render () {
        this.components.forEach( (component) => {
            let c = new component(this.chatId, this.store);
            this.el.append(c);
        });
        
        document.querySelector(`${this.rootElement}`).append(this.el);
    }
    
}

export { ChatBox };