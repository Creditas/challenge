'use strict';

const chats = [];
const getElementHTML = function(selector) {
    return document.querySelector(selector);
};
const getChildNode = function(elementHTML, selector) {
    return elementHTML.querySelector(selector);
};

const Message = function(text) {
    this.createElementHTML = function(text) {
        const listElement = document.createElement('LI');
        const textNode = document.createTextNode(text);
        listElement.appendChild(textNode);
        return listElement;
    };
    this.elementHTML = this.createElementHTML(text);
    this.text = text;
};

const Chat = function(elementHTML) {
    this.messageList = getChildNode(elementHTML, 'UL');
    this.addChatMessage = function(messageText) {
        const newMessage = new Message(messageText);
        this.messageList.appendChild(newMessage.elementHTML);
    };

    const onNewMessage = event => {
        event.preventDefault();
        const messageInput = getChildNode(elementHTML, '.message-input input');
        const messageText = messageInput.value;
        if(messageText) {
            this.addChatMessage(messageText);
            messageInput.value = '';
        }
    };
    const sendButton = getChildNode(elementHTML, '.message-input button');
    sendButton.addEventListener('click', onNewMessage);
};

(function() {
    const chatElement = getElementHTML('.messages');
    const newChat = new Chat(chatElement);
    chats.push(newChat);
})();