'use strict';

import { CHATMESSAGELIST_TEMPLATE } from '../templates/chat-messagelist';
/**
 * @class ChatMessageList
 * @description Listen to new messages, and show then on the screen
 * 
 * @param chatId
 * @param store
 */
class ChatMessageList {
    constructor(chatId, store) {    
        this.chatId = chatId;
        this.store = store;

        this.el = document.createElement('div');
        this.el.innerHTML = CHATMESSAGELIST_TEMPLATE;
        this.el.className += 'chat__messages';

        this.setListeners(this.chatId);
        return this.el;     
    }

    /**
     * @method setListeners
     * @param chatId
     */
    setListeners (chatId) {
        this.store.subscribe('SEND_MESSAGE', (args) => {
            if (args[0] == this.chatId) {
                this.addMessage(args[0], args[1]);
            }
        });
    }

    /**
     * @method addMessage
     * @param chatId
     * @param message
     */
    addMessage(chatId, message) {
        let messageEl = document.createElement('li');
        messageEl.innerHTML = message;        

        if (this.chatId === chatId) {
            this.el.firstChild.appendChild(messageEl);
        }        
    }

}

export { ChatMessageList };