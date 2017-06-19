'use strict';

if (module.hot) {
  module.hot.accept();
}

import '../styles/styles.scss';
import ChatFactory from "./chatFactory";

var room = new ChatFactory({
    chatType: 'normal',
    placeholder: '.messages'
});

var roomAjax = new ChatFactory({
    chatType: 'ajax',
    placeholder: '.messages-ajax'
});
