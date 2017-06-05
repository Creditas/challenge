(function (global) {

  'use strict';
  var template = global.document.querySelector('.messages');

  var test = new global.Chat('uuid-0', template);

  test.addMessage('hello, world!');

  new global.Chat('uuid-1', template);

  global.Chat.collection.get('uuid-1').addMessage('Hey, you!');

  global.Chat.collection.get('uuid-0').bind('localMessage', text => {

    console.log(text);

  });

  window.setTimeout(
    () => test.addMessage('This a message from somewhere else!'),
    3000
  );

})(window);
