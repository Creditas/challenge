import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('chat-input-bar', 'Integration | Component | chat input bar', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{chat-input-bar}}`);

  assert.equal(this.$().find('input').length, 1);
  assert.equal(this.$().find('button').length, 1);
});
