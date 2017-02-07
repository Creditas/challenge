'use strict';

import { CHATNAVIGATION_TEMPLATE } from '../templates/chat-navigation';

/**
 * @class ChatNavigation
 * @description Responsible for all the navigation part (chat text input, chat send button,
 *              and all future plugins/functionalities that will be added later);
 * @param chatId 
 * @param store 
 *              
 */

class ChatNavigation {
    constructor(chatId, store) {
        this.chatId = chatId
        this.store = store;

        this.el = document.createElement('div');
        this.el.innerHTML = CHATNAVIGATION_TEMPLATE;
        this.el.className += 'chat__nav';

        this.setListeners();

        return this.el;
    }

    /**
     * @method setListeners
     */
    setListeners() {        
        this.el
            .querySelector(`.chat__sendbutton`)
            .addEventListener('click', () => {
                this.sendMessage(this.chatId);
            } );
    }

    /**
     * @method sendMessage
     * @param chatId;
     */
    sendMessage(chatId) {
        let msgInput = this.el.querySelector('input');        

        if (msgInput.value === null || msgInput.value === '') return;
        
        this.store.publish('SEND_MESSAGE', chatId, msgInput.value);

        msgInput.value = '';
        msgInput.focus();
    }
}

export { ChatNavigation };