import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('chat-window', 'Integration | Component | chat window', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{chat-window}}`);

  assert.equal(this.$().find('ul.message-list').length, 1);
  assert.equal(this.$().find('div.message-input').length, 1);
});
