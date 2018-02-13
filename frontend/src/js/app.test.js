'use strict';

var Chat = require('./app.js');

var CreditasChat = new Chat('.messages');

describe('Creates a new chat instance', function() {
  it('Created a new chat window on the frontend', function() {
    document.body.innerHTML = '<div class="messages"></div>';
    CreditasChat.create();

    expect(document.querySelector('[data-chat-wrapper-id="0"]')).toBeTruthy()
  });

  it('Chat object was properly set', function() {
    expect(CreditasChat.content['0'].messages).toBeDefined();
  });
});	

describe('Send a message', function() {
  it('send() – Full send message flow', function() {
    expect(CreditasChat.send(0)).toBeTruthy();
  });

  it('storeMessage() – Message was stored', function() {
    expect(CreditasChat.content['0'].messages['1']).toBeDefined();
  });

  it('buildChatBubbles() – Chat bubbles were created', function() {
    expect(document.querySelector('[data-chat-message-list-id="0"] .element-message')).toBeTruthy()
  });

  it('clear() – Input value was cleared', function() {
    expect(document.querySelector('[data-chat-input-id="0"]').value).toBe('')
  });
});	

describe('Utils', function() {
  it('Returns current time', function() {
    const date = new Date();
    const time = `${date.getHours()}h${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
    
    expect(CreditasChat.getCurrentTime()).toEqual(time);
  });

  it('Returns all messages from the specified test', function(){
    expect(CreditasChat.getMessages(0)).toBeDefined;
  })

  it('Returns current typed message in the input', function(){
    document.querySelector('[data-chat-input-id="0"]').value = 'jest-test';
    
    expect(CreditasChat.getMessage(0)).toBe('jest-test');
  })

  it('Renders HTML to desired target', function(){
    CreditasChat.render('body', '<span class="jest-test-render"></span>');
    expect(document.querySelector('span.jest-test-render')).toBeDefined;
  })

});	