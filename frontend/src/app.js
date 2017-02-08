// [TO-DO] could have used babel to use const / let / arrow functions safely
// use strict to avoid hoisting mistakes
"use strict";

// defining main variables 
const messagesElementsHolder = document.getElementById('messages-holder'),
    messagesElements = messagesElementsHolder.getElementsByClassName('messages'),
    newChatButton = document.getElementById('new-chat')

// Messages prototype to create objects
const Messages = function(messages) {
    this.messageForm = messages.querySelector('form'),
    this.simulateDiv = messages.querySelector('.simulate'),
    this.messageSendButton = this.messageForm.querySelector('button'),
    this.messageTextInput = this.messageForm.querySelector('input'),
    this.messageList = messages.querySelector('.message-list')
}

// Filter new chats and apply listeners to them
function createChats() {
    Array.from(messagesElements)
        .filter(messages => messages.classList.contains('messages-new'))
        .map(messages => {
        const messageObj = new Messages(messages)
        messageObj.messageForm.addEventListener('submit', (e) => {
            e.preventDefault()
            sendMessage(messageObj, 'me')
        })
        messageObj.messageSendButton.addEventListener('click', (e) => {
            e.preventDefault()
            sendMessage(messageObj, 'me')
        })
        messageObj.simulateDiv.addEventListener('click', (e) => {
            e.preventDefault()
            let mockMessageObj = messageObj
            if(messageObj.messageTextInput.value != "")
                mockMessageObj.messageTextInput.value = messageObj.messageTextInput.value
            else
                mockMessageObj.messageTextInput.value = "<br>Write something in the input to simulate a bot response =)"
            sendMessage(messageObj, 'friend')
        })
    messages.classList.remove('messages-new')})
}

// if not empty, add message to the list
function sendMessage(messageObj, who) {
    let messageTextInputValue = messageObj.messageTextInput.value
    if(messageTextInputValue !== "") {
        const liList = messageObj.messageList.querySelectorAll('li'),
            lastLi = liList[liList.length - 1]
        let li
        if(!lastLi.classList.contains(who)) {
            li = document.createElement('li')
            li.classList.add(who)
            li.innerText = messageObj.messageTextInput.value
            messageObj.messageList.appendChild(li)
        } else {
            li = lastLi
            li.innerHTML += "<br>" + messageObj.messageTextInput.value
        }
        messageObj.messageTextInput.value = ""
        messageObj.messageList.scrollTop = messageObj.messageList.scrollHeight
        messageObj.messageTextInput.focus()
    }
}

// initiate the first chat
createChats()
    // on newChat click add new chat and createChats for new chats 
    newChatButton.addEventListener('click', function(e) {
    e.preventDefault()
    messagesElementsHolder.appendChild(newChat())
    createChats()
})

// Create a new chat node
function newChat() {
    /* fake bot */ const simulateDiv = document.createElement('div')
    /* fake bot */ const initialLi = document.createElement('li')

    const messages = document.createElement('div'),
        messageList = document.createElement('ul'),
        messageInput = document.createElement('div'),
        form = document.createElement('form'),
        input = document.createElement('input'),
        button = document.createElement('button')

    /* fake bot */ simulateDiv.classList.add('simulate')
    /* fake bot */ simulateDiv.innerHTML = "Click here to simulate a bot response"
    /* fake bot */ initialLi.classList.add('friend')
    /* fake bot */ initialLi.innerHTML = "Hi! How can I help you?"

    messages.classList.add('messages', 'messages-new')
    messageList.classList.add('message-list')
    messageInput.classList.add('message-input')
    form.setAttribute('method', 'post')
    input.setAttribute('type', 'text')
    button.setAttribute('type', 'button')

    /* fake bot */ messages.appendChild(simulateDiv)
    /* fake bot */ messageList.appendChild(initialLi)

    messages.appendChild(messageList)
    form.appendChild(input)
    form.appendChild(button)
    messageInput.appendChild(form)
    messages.appendChild(messageInput)
    return messages
}