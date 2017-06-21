import Ember from 'ember';
const {
  Component,
  inject
} = Ember;

export default Component.extend({
  classNames: ['messages'],
  chat: inject.service(),
  messages:[],

  init() {
    this._super(...arguments);
    const chat = this.get('chat');
    const chatId = this.get('chatId');
    this.set('messages', chat.getMessages(chatId));

    this.get('chat').on(`received@${chatId}`, () => {
      this.set('messages', chat.getMessages(chatId))
    })
  }
});
