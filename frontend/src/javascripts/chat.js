'use strict';
var Message = require('./message');

function Chat () {
  this.$messagesList = document.getElementsByClassName('message-list')[0];
  this.$messageInput = document.getElementsByClassName('message-input')[0];
  this.$sendButton = document.getElementsByClassName('send-message-button')[0];
  this.bindEvents();
}

Chat.prototype.bindEvents = function () {
  this.$sendButton.addEventListener('click', this.sendMessage.bind(this));
  document.addEventListener('keypress', this.handleKeyPress.bind(this));
}

Chat.prototype.handleKeyPress = function (e) {
  var key = e.which || e.keycode;
  var isInputActive = document.activeElement === this.$messageInput;

  if (key === 13 && isInputActive) {
    this.sendMessage();
  }
}

Chat.prototype.sendMessage = function () {
  var messageText = this.$messageInput.value.trim();

  if (messageText) {
    this.$messagesList.innerHTML += new Message(messageText).render();
    this.clearInput();
  }
}

Chat.prototype.clearInput = function () {
  this.$messageInput.value = "";
  this.$messageInput.focus();
}

new Chat();
