(function (global) {

  'use strict';
  function Chat (id, template) {

    var element = template.cloneNode(true);

    window.document.querySelector('body').appendChild(element);

    this.button = element.querySelector('.message-input button');
    this.messages = element.querySelector('.message-list');
    this.input = element.querySelector('.message-input input');

    this.button.addEventListener('click', () => {

      this.addMessage(this.input.value);

      this.trigger('localMessage', this.input.value);

      this.input.value = '';

    });

    this.input.addEventListener('keypress', event => {

      if (event.key === 'Enter') {

        this.addMessage(this.input.value);

        this.trigger('localMessage', this.input.value);

        this.input.value = '';

      }

    });

    Chat.collection.set(id, this);

  }

  Chat.prototype.addMessage = function addMessage (text) {

    if (!text) {

      return;

    }

    var message = window.document.createElement('li');
    message.textContent = text;

    this.messages.appendChild(message);

  };

  Chat.collection = new Map();

  window.MicroEvent.mixin(Chat);

  global.Chat = Chat;

})(window);
