require('pubsub-js');

const resource = {
  init
}

export { resource };

function init(user) {
  retrieveMessages();
  setUser(user);
}