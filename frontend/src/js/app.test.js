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
