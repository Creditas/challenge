const Handlebars = require('handlebars');

function Message (text) {
  var template = document.getElementById('message-handlebars-template').innerHTML.trim();

  this.messageText = text;
  this.template = Handlebars.compile(template);
}

Message.prototype.render = function () {
  var context = { 'messageText': this.messageText };

  return this.template(context);
}

module.exports = Message;
