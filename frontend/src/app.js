"use strict";

// Defining main variables 
const messagesElementsHolder = document.getElementById('chat'),
    messagesElements = messagesElementsHolder.getElementsByClassName('chat__messages'),
    newChatButton = document.getElementById('new-chat')

// Messages prototype to create objects
const Messages = function (messages) {
    this.messageForm = messages.querySelector('form')
    this.simulateDiv = messages.querySelector('.chat__simulate')
    this.messageSendButton = this.messageForm.querySelector('button')
    this.messageTextInput = this.messageForm.querySelector('input')
    this.messageList = messages.querySelector('.chat__message-list')
}

// Filter new chats and apply listeners to them
function createChats() {
    Array.from(messagesElements)
        .filter(messages => messages.classList.contains('chat__messages--new'))
        .map(messages => {

            const messageObj = new Messages(messages)

            messageObj.messageForm.addEventListener('submit', (e) => {
                e.preventDefault()
                sendMessage(messageObj, 'chat__message-item--me')
            })

            messageObj.messageSendButton.addEventListener('click', (e) => {
                e.preventDefault()
                sendMessage(messageObj, 'chat__message-item--me')
            })

            messageObj.simulateDiv.addEventListener('click', (e) => {
                e.preventDefault()
                let mockMessageObj = messageObj
                if (messageObj.messageTextInput.value != "")
                    mockMessageObj.messageTextInput.value = messageObj.messageTextInput.value
                else
                    mockMessageObj.messageTextInput.value = "Write something in the input to simulate a bot response =)"
                sendMessage(messageObj, 'chat__message-item--bot')
            })

            messages.classList.remove('chat__messages--new')
        })
}

// If not empty, add message to the list
function sendMessage(messageObj, who) {
    let messageTextInputValue = messageObj.messageTextInput.value

    if (messageTextInputValue === "") { return }

    const liList = messageObj.messageList.querySelectorAll('li'),
        lastLi = liList[liList.length - 1]

    let li

    if (!lastLi.classList.contains(who)) {
        li = document.createElement('li')
        li.classList.add('chat__message-item', who)
        li.innerText = messageObj.messageTextInput.value
        messageObj.messageList.appendChild(li)
    } else {
        li = lastLi
        li.innerHTML += "<br>" + messageObj.messageTextInput.value
    }

    if (who === 'chat__message-item--me') {
        consumeApi(messageTextInputValue, messageObj, sendMessage)
    }

    messageObj.messageTextInput.value = ""
    messageObj.messageList.scrollTop = messageObj.messageList.scrollHeight
    messageObj.messageTextInput.focus()
}

// Create a new chat node
function newChat() {
    /* fake bot */
    const simulateDiv = document.createElement('div'),
        initialLi = document.createElement('li')

    const messages = document.createElement('div'),
        messageList = document.createElement('ul'),
        messageInput = document.createElement('div'),
        form = document.createElement('form'),
        input = document.createElement('input'),
        button = document.createElement('button')

    /* fake bot */
    simulateDiv.classList.add('chat__simulate')
    initialLi.classList.add('chat__message-item', 'chat__message-item--bot')
    simulateDiv.innerHTML = "Click here to simulate a bot response"
    initialLi.innerHTML = "Hi! How can I help you?"

    messages.classList.add('chat__messages', 'chat__messages--new')
    messageList.classList.add('chat__message-list')
    messageInput.classList.add('chat__message-input')
    form.setAttribute('method', 'post')
    input.setAttribute('type', 'text')
    button.setAttribute('type', 'button')

    /* fake bot */
    messages.appendChild(simulateDiv)
    messageList.appendChild(initialLi)

    messages.appendChild(messageList)
    form.appendChild(input)
    form.appendChild(button)
    messageInput.appendChild(form)
    messages.appendChild(messageInput)

    return messages

}

function consumeApi(question, messageObj, fn) {
    var xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const data = JSON.parse(this.responseText)
            // [TO-DO] this have to be verified on server side
            if (data.hasOwnProperty(question)) {
                const mockMessageObj = messageObj
                mockMessageObj.messageTextInput.value = data[question]

                sendMessage(mockMessageObj, 'chat__message-item--bot')
            }
        }
    }

    xhr.open("GET", "mock.json", true);

    xhr.send();
}

// initiate the first chat
createChats()

// on newChat click add new chat and createChats for new chats 
newChatButton.addEventListener('click', function (e) {
    e.preventDefault()
    messagesElementsHolder.appendChild(newChat())
    createChats()
})