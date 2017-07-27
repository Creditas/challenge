'use strict';

if (module.hot) {
  module.hot.accept();
}

import '../styles/styles.scss';
import ChatFactory from "./chatFactory";

let room = new ChatFactory({
    chatType: 'normal',
    placeholder: '.messages'
});

let roomAjax = new ChatFactory({
    chatType: 'ajax',
    placeholder: '.messages-ajax'
});
