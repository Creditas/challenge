'use strict';

var Chat = require('./app.js');

var CreditasChat = new Chat('.messages');


describe('Utils', function() {
  it('Gets current time', function() {
    const date = new Date();
    const time = `${date.getHours()}h${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
    
    expect(CreditasChat.getCurrentTime()).toEqual(time);
  });
});	

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