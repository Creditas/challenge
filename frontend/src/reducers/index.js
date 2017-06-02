'use strict';

const chatReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_CHAT':
    return state.concat(action.chat);
  case 'ADD_MESSAGE':
    return state.map( chat => {
      return Object.assign({}, chat, {
        messages: [ ...chat.messages, action.message ]
      } );
    } );
  default:
    return state;
  }
};

export { chatReducer };
