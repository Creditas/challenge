'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chat = function () {
	function Chat(selector) {
		_classCallCheck(this, Chat);

		this.selector = selector;
		this.chat_count = 0;
		this.content = [];
		this.message_id = 0;
	}

	_createClass(Chat, [{
		key: 'getCurrentTime',
		value: function getCurrentTime() {
			var date = new Date();
			var time = date.getHours() + 'h' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();

			return time;
		}
	}, {
		key: 'create',
		value: function create() {
			var id = this.chat_count++;

			this.content[id] = [];
			this.content[id]['messages'] = [];

			var markup = '\n\t\t\t<form class="chat-wrapper" data-chat-wrapper-id="' + id + '" action="javascript:chat.send(' + id + ')">\n\t\t\t\t<ul class="message-list" data-chat-message-list-id="' + id + '"></ul>\n\t\t\t\t<div class="message-input-container">\n\t\t\t\t\t<input type="text" class="message-input" placeholder="Digite sua mensagem..." data-chat-input-id="' + id + '" />\n\t\t\t\t\t<button class="send-button" type="submit"></button>\n\t\t\t\t</div>\n\t\t\t</form>';

			this.render(this.selector, markup);
		}
	}, {
		key: 'getMessages',
		value: function getMessages(id) {
			return this.content['' + id]['messages'];
		}
	}, {
		key: 'render',
		value: function render(target, content) {
			var increment = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

			increment ? document.querySelector(target).innerHTML += content : document.querySelector(target).innerHTML = content;
		}
	}, {
		key: 'scrollToBottom',
		value: function scrollToBottom(id) {
			var el = document.querySelector('ul[data-chat-message-list-id="' + id + '"]');
			el.scrollTop = el.scrollHeight;
		}
	}, {
		key: 'buildChatBubbles',
		value: function buildChatBubbles(id) {
			var messages = this.getMessages(id);
			var markup = '';

			for (var key in messages) {
				if (messages.hasOwnProperty(key)) {
					markup += '<li class="wrap-message"><span class="element-message">' + messages[key].text + '</span></li>';
				}
			}

			this.render('ul[data-chat-message-list-id="' + id + '"]', markup, false);
			this.scrollToBottom(id);
		}
	}, {
		key: 'clear',
		value: function clear(id) {
			document.querySelector('input[data-chat-input-id="' + id + '"]').value = '';
		}
	}, {
		key: 'getMessage',
		value: function getMessage(id) {
			return document.querySelector('input[data-chat-input-id="' + id + '"]').value;
		}
	}, {
		key: 'increaseMessageCount',
		value: function increaseMessageCount() {
			this.message_id++;
			return this.message_id;
		}
	}, {
		key: 'storeMessage',
		value: function storeMessage(id) {
			this.increaseMessageCount();
			var message = this.getMessage(id);

			this.content['' + id]['messages']['' + this.message_id] = [];
			this.content['' + id]['messages']['' + this.message_id]['text'] = message;
			this.content['' + id]['messages']['' + this.message_id]['time'] = this.getCurrentTime();

			// In the future, our application would store data in a server.
		}
	}, {
		key: 'send',
		value: function send(id) {
			this.storeMessage(id);
			this.buildChatBubbles(id);
			this.clear(id);

			return true;
		}
	}]);

	return Chat;
}();

var chat = new Chat('.messages');
module.exports = Chat;
//# sourceMappingURL=all.js.map
