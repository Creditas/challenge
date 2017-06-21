import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('chat-message', 'Integration | Component | chat message', {
  integration: true
});

test('it renders', function(assert) {

  this.set('message', {
    text: 'foo bar'
  })

  this.render(hbs`{{chat-message model=message}}`);

  assert.equal(this.$().text().trim(), 'foo bar');
});
