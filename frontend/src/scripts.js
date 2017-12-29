/**
 * Simple Chat APP
 * 
 * Allow multiple chats in the same window
 * @author Luiz Silva <folksilva@gmail.com>
 */
var messageList, messageForm, messageText, chats = [], currentChat, lastMessage;

/**
 * Initialize the chat application
 */
function init() {
    messageList = document.getElementById('messageList');
    messageForm = document.getElementById('messageForm');
    messageText = document.getElementById('messageText');

    currentChat = startChat();
    openChat(currentChat);

    messageForm.addEventListener('submit', (ev) => {
        ev.preventDefault();
        sendMessage(messageText.value);
        messageText.value = '';
    });
}

/**
 * Creates a new chat
 */
function startChat() {
    return chats.push({messages:[]}) -1;
}

/**
 * Open a chat for conversation
 * @param {int} chatId 
 */
function openChat(chatId) {
    currentChat = chatId;
    renderChat(currentChat, true);
}

/**
 * Send a message in the current chat
 * @param {string} message 
 */
function sendMessage(message) {
    messageSent(message);
}

/**
 * Callback for a message sent in the current chat
 * @param {string} message 
 */
function messageSent(message) {
    addMessage(currentChat, 'outcome', message);
    // Emulate a response
    messageReceived(currentChat, 'ECHO: ' + message);
}

/**
 * Callback for a received message in a chat
 * @param {int} chatId 
 * @param {string} message 
 */
function messageReceived(chatId, message) {
    addMessage(chatId, 'income', message);
}

/**
 * Add a message to a chat
 * @param {int} chatId 
 * @param {string} type 
 * @param {string} message 
 */
function addMessage(chatId, type, message) {
    chats[chatId].messages.push({type:type, content:message});
    if (chatId === currentChat) {
        renderChat(currentChat);
    }
}

/**
 * Render a chat in the screen
 * @param {int} chatId If different from current chat, clear the screen and render all messages 
 * @param {bool} force If true, clear the screen and render all messages
 */
function renderChat(chatId, force) {
    let i;
    if (force || chatId !== currentChat) {
        messageList.innerHTML = '';
        lastMessage = 0;
    }
    for (i = lastMessage; i < chats[chatId].messages.length; i += 1) {
        renderMessage(chats[chatId].messages[i]);
        lastMessage = i + 1;
    }

}

/**
 * Render a chat message in the screen
 * @param {string} message 
 */
function renderMessage(message) {
    let messageEl = document.createElement('li');
    messageEl.className = message.type;
    let messageContentEl = document.createElement('div');
    messageContentEl.className = 'message-content';
    messageContentEl.innerText = message.content;
    messageEl.appendChild(messageContentEl);
    messageList.appendChild(messageEl);
}
