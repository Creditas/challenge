import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    sendMessage() {
      let text = this.get('text');

      this.get('store').createRecord('messages', {text});

      this.set('text', '');
    }
  }
});
