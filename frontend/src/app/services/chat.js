import Service from 'ember-service';
import Evented from 'ember-evented';
import Ember from 'ember';

export default Service.extend(Evented, {

  messages: {
    'aureliosaraiva-creditas': [{
      text: 'olá Aurélio'
    }]
  },
  getMessages(chatId) {
    const key = `messages.${chatId}`;

    // create message store if chatId is undefined
    if (!this.get(key)) {
      this.set(key, []);
    }
    return this.get(key);
  },
  sendMessage(chatId, text){
    // notify chat-windows that arrive new message
    this.trigger(`received@${chatId}`, { text });
    this.get(`messages.${chatId}`).pushObject({ text });
  }
});
