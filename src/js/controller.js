require('pubsub-js');

import { view } from './view';
import { resource } from './resource';

const controller = {
  setListeners,
  submitMessage,
  submitMessages
}

export { controller };

function setListeners() {
  PubSub.subscribe('message:sent', submitMessage);
  PubSub.subscribe('messages:received', submitMessages);
}

function submitMessage(event, message) {
  resource.saveMessage(message);
  view.addMessage(message);
}

function submitMessages(event, messages) {
  messages.forEach((message) => {
    view.addMessage(message);
  });
}