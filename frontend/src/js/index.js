import Controller from './controller'

const messages = document.querySelector('div.messages')
messages.addEventListener('click', Controller.sendMessage, false)
