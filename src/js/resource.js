require('pubsub-js');

import { localStorageGet, localStorageSet } from './utils';

const resource = {
  init,
  saveMessage,
  getUser,
  retrieveMessages
}

export { resource };

function init(user) {
  retrieveMessages();
  setUser(user);
}

function setUser(user) {
  localStorageSet('user', user);
}

function getUser(user) {
  return localStorageGet('user');
}

function retrieveMessages() {
  const messages = localStorageGet('messages');

  if (!messages) {
    localStorageSet('messages', []);

    return;
  }

  PubSub.publish('messages:received', messages);
}

function saveMessage(message) {
  const messages = localStorageGet('messages');

  if (messages.length >= 5) {
    messages.shift();
  }

  messages.push(message);
  localStorageSet('messages', messages);
}
