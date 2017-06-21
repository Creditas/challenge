import Ember from 'ember';

const  {
  Component,
  inject
} = Ember;

export default Component.extend({
  classNames: ['message-input'],
  chat: inject.service(),
  text: '',
  actions: {
    actionSendMessage(){
      this.get('chat').sendMessage(this.get('chatId'), this.get('text'));
      this.set('text', null);
    }
  }
});
