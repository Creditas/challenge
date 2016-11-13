(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require("./helpers/util");

var _messageView = require("./views/messageView");

var _messageSender = require("./services/messageSender");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
	function App(messengerId) {
		_classCallCheck(this, App);

		var chatUi = _util.Util.getElement(messengerId);

		if (chatUi == undefined) {
			console.log("Error: unable to connect to chat ui");
			return;
		}

		this.getMessageList(chatUi);
		this.getMessageInput(chatUi);
	}

	_createClass(App, [{
		key: "getMessageList",
		value: function getMessageList(chatUi) {
			var messageList = _util.Util.getElement(".message-list", chatUi);

			if (messageList == undefined) {
				throw new Error("Unable to connect to message list");
			}

			var messageView = new _messageView.MessageView(messageList);
			messageView.append({ sender: "SYSTEM", message: "Welcome", sent: false });
		}
	}, {
		key: "getMessageInput",
		value: function getMessageInput(chatUi) {
			var messageInput = _util.Util.getElement(".message-input", chatUi);
			new _messageSender.MessageSender(messageInput, chatUi);
		}
	}]);

	return App;
}();

var app = new App("#tsc");
var app2 = new App("#vls");

},{"./helpers/util":2,"./services/messageSender":3,"./views/messageView":4}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Util = exports.Util = function () {
	function Util() {
		_classCallCheck(this, Util);

		throw new Error('This class cannot be intantiated');
	}

	_createClass(Util, null, [{
		key: 'getElement',
		value: function getElement(selector, node) {
			if (node == undefined) {
				return document.querySelector(selector);
			}
			return node.querySelector(selector);
		}
	}, {
		key: 'getElements',
		value: function getElements(selector, node) {
			if (node == undefined) {
				return document.querySelectorAll(selector);
			}
			return node.querySelectorAll(selector);
		}
	}]);

	return Util;
}();

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MessageSender = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require("../helpers/util");

var _messageView = require("../views/messageView");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessageSender = exports.MessageSender = function () {
	function MessageSender(element, chatUi) {
		_classCallCheck(this, MessageSender);

		if (element == undefined) {
			throw new Error("Unable to conect to sender ui");
		}
		this.chatUi = chatUi;
		this.init(element);
	}

	_createClass(MessageSender, [{
		key: "init",
		value: function init(element) {
			this.observe(element);
		}
	}, {
		key: "observe",
		value: function observe(element) {
			this.element = _util.Util.getElement("#message", element);
			this.sendButton = _util.Util.getElement("button", element);
			this.handleFocusObserer();
		}
	}, {
		key: "handleFocusObserer",
		value: function handleFocusObserer() {
			this.sendButton.addEventListener('click', this.sendMessage.bind(this));
			this.element.addEventListener('focus', this.observeIfFocused.bind(this));
			this.element.addEventListener('blur', this.observeIfNotFocused.bind(this));
		}
	}, {
		key: "observeIfFocused",
		value: function observeIfFocused() {
			this.element.addEventListener('keyup', this.observeKeys.bind(this));
		}
	}, {
		key: "observeIfNotFocused",
		value: function observeIfNotFocused() {
			this.element.removeEventListener('keyup', this.observeKeys);
		}
	}, {
		key: "observeKeys",
		value: function observeKeys(event) {
			if (event.keyCode == 13 && this.element.value.length) {
				this.sendMessage();
			}
		}
	}, {
		key: "sendMessage",
		value: function sendMessage() {
			var message = this.element.value;

			if (message.length <= 0) {
				return;
			}

			var messageView = new _messageView.MessageView(_util.Util.getElement(".message-list", this.chatUi));

			messageView.append({
				sender: "Me",
				message: this.element.value,
				sent: true
			});

			this.element.value = "";
			console.log(message);
		}
	}]);

	return MessageSender;
}();

},{"../helpers/util":2,"../views/messageView":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.MessageView = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _view = require("./view.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MessageView = exports.MessageView = function (_View) {
	_inherits(MessageView, _View);

	function MessageView(elemento) {
		_classCallCheck(this, MessageView);

		return _possibleConstructorReturn(this, (MessageView.__proto__ || Object.getPrototypeOf(MessageView)).call(this, elemento));
	}

	_createClass(MessageView, [{
		key: "template",
		value: function template(model) {
			var sentClass = model.sent ? "sent" : "received";
			var error = model.error ? " error" : "";
			return "<li class=\"" + sentClass + error + "\">\n\t\t\t\t\t<span class=\"sender\">" + model.sender + ": </span> \n\t\t\t\t\t" + model.message + "\n\t\t\t\t</li>";
		}
	}]);

	return MessageView;
}(_view.View);

},{"./view.js":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = exports.View = function () {
	function View(elemento) {
		_classCallCheck(this, View);

		this._elemento = elemento;
	}

	_createClass(View, [{
		key: 'template',
		value: function template() {
			throw new Error('The _template method must be implemented');
		}
	}, {
		key: 'append',
		value: function append(obj) {
			var element = this.template(obj);
			this._elemento.insertAdjacentHTML('beforeend', element);
		}
	}]);

	return View;
}();

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL2hlbHBlcnMvdXRpbC5qcyIsInNyYy9qcy9zZXJ2aWNlcy9tZXNzYWdlU2VuZGVyLmpzIiwic3JjL2pzL3ZpZXdzL21lc3NhZ2VWaWV3LmpzIiwic3JjL2pzL3ZpZXdzL3ZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FDQUE7O0FBQ0E7O0FBQ0E7Ozs7SUFFTSxHO0FBQ0wsY0FBWSxXQUFaLEVBQXdCO0FBQUE7O0FBQ3ZCLE1BQUksU0FBUyxXQUFLLFVBQUwsQ0FBZ0IsV0FBaEIsQ0FBYjs7QUFFQSxNQUFJLFVBQVUsU0FBZCxFQUF3QjtBQUN2QixXQUFRLEdBQVIsQ0FBWSxxQ0FBWjtBQUNBO0FBQ0E7O0FBRUQsT0FBSyxjQUFMLENBQW9CLE1BQXBCO0FBQ0EsT0FBSyxlQUFMLENBQXFCLE1BQXJCO0FBQ0E7Ozs7aUNBRWMsTSxFQUFPO0FBQ3JCLE9BQUksY0FBYyxXQUFLLFVBQUwsQ0FBZ0IsZUFBaEIsRUFBaUMsTUFBakMsQ0FBbEI7O0FBRUEsT0FBRyxlQUFlLFNBQWxCLEVBQTRCO0FBQzNCLFVBQU0sSUFBSSxLQUFKLENBQVUsbUNBQVYsQ0FBTjtBQUNBOztBQUVELE9BQUksY0FBYyw2QkFBZ0IsV0FBaEIsQ0FBbEI7QUFDQSxlQUFZLE1BQVosQ0FBbUIsRUFBQyxRQUFRLFFBQVQsRUFBbUIsU0FBUyxTQUE1QixFQUF1QyxNQUFNLEtBQTdDLEVBQW5CO0FBQ0E7OztrQ0FFZSxNLEVBQU87QUFDdEIsT0FBSSxlQUFlLFdBQUssVUFBTCxDQUFnQixnQkFBaEIsRUFBa0MsTUFBbEMsQ0FBbkI7QUFDQSxvQ0FBa0IsWUFBbEIsRUFBZ0MsTUFBaEM7QUFFQTs7Ozs7O0FBR0YsSUFBSSxNQUFNLElBQUksR0FBSixDQUFRLE1BQVIsQ0FBVjtBQUNBLElBQUksT0FBTyxJQUFJLEdBQUosQ0FBUSxNQUFSLENBQVg7Ozs7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LFVBQXRDO0FBQ0EsT0FBSSxRQUFRLE1BQU0sS0FBTixHQUFjLFFBQWQsR0FBeUIsRUFBckM7QUFDQSwyQkFBcUIsU0FBckIsR0FBaUMsS0FBakMsOENBQzBCLE1BQU0sTUFEaEMsOEJBRUssTUFBTSxPQUZYO0FBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDakJXLEksV0FBQSxJO0FBRVosZUFBWSxRQUFaLEVBQXFCO0FBQUE7O0FBQ3BCLE9BQUssU0FBTCxHQUFpQixRQUFqQjtBQUNBOzs7OzZCQUVTO0FBQ1QsU0FBTSxJQUFJLEtBQUosQ0FBVSwwQ0FBVixDQUFOO0FBQ0E7Ozt5QkFFTSxHLEVBQUk7QUFDVixPQUFJLFVBQVUsS0FBSyxRQUFMLENBQWMsR0FBZCxDQUFkO0FBQ0EsUUFBSyxTQUFMLENBQWUsa0JBQWYsQ0FBbUMsV0FBbkMsRUFBZ0QsT0FBaEQ7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBVdGlsIH0gZnJvbSBcIi4vaGVscGVycy91dGlsXCJcbmltcG9ydCB7IE1lc3NhZ2VWaWV3IH0gZnJvbSBcIi4vdmlld3MvbWVzc2FnZVZpZXdcIlxuaW1wb3J0IHsgTWVzc2FnZVNlbmRlciB9IGZyb20gXCIuL3NlcnZpY2VzL21lc3NhZ2VTZW5kZXJcIlxuXG5jbGFzcyBBcHAge1xuXHRjb25zdHJ1Y3RvcihtZXNzZW5nZXJJZCl7XG5cdFx0bGV0IGNoYXRVaSA9IFV0aWwuZ2V0RWxlbWVudChtZXNzZW5nZXJJZClcblxuXHRcdGlmKCBjaGF0VWkgPT0gdW5kZWZpbmVkKXtcblx0XHRcdGNvbnNvbGUubG9nKFwiRXJyb3I6IHVuYWJsZSB0byBjb25uZWN0IHRvIGNoYXQgdWlcIilcblx0XHRcdHJldHVyblxuXHRcdH1cblxuXHRcdHRoaXMuZ2V0TWVzc2FnZUxpc3QoY2hhdFVpKVxuXHRcdHRoaXMuZ2V0TWVzc2FnZUlucHV0KGNoYXRVaSlcblx0fVxuXG5cdGdldE1lc3NhZ2VMaXN0KGNoYXRVaSl7XG5cdFx0bGV0IG1lc3NhZ2VMaXN0ID0gVXRpbC5nZXRFbGVtZW50KFwiLm1lc3NhZ2UtbGlzdFwiLCBjaGF0VWkpXG5cblx0XHRpZihtZXNzYWdlTGlzdCA9PSB1bmRlZmluZWQpe1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5hYmxlIHRvIGNvbm5lY3QgdG8gbWVzc2FnZSBsaXN0XCIpO1xuXHRcdH1cblxuXHRcdGxldCBtZXNzYWdlVmlldyA9IG5ldyBNZXNzYWdlVmlldyhtZXNzYWdlTGlzdClcblx0XHRtZXNzYWdlVmlldy5hcHBlbmQoe3NlbmRlcjogXCJTWVNURU1cIiwgbWVzc2FnZTogXCJXZWxjb21lXCIsIHNlbnQ6IGZhbHNlfSlcblx0fVxuXG5cdGdldE1lc3NhZ2VJbnB1dChjaGF0VWkpe1xuXHRcdGxldCBtZXNzYWdlSW5wdXQgPSBVdGlsLmdldEVsZW1lbnQoXCIubWVzc2FnZS1pbnB1dFwiLCBjaGF0VWkpXG5cdFx0bmV3IE1lc3NhZ2VTZW5kZXIobWVzc2FnZUlucHV0LCBjaGF0VWkpXG5cblx0fVxufVxuXG52YXIgYXBwID0gbmV3IEFwcChcIiN0c2NcIilcbnZhciBhcHAyID0gbmV3IEFwcChcIiN2bHNcIilcbiIsImV4cG9ydCBjbGFzcyBVdGlsIHtcblx0XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdUaGlzIGNsYXNzIGNhbm5vdCBiZSBpbnRhbnRpYXRlZCcpXG5cdH1cblxuXHRzdGF0aWMgZ2V0RWxlbWVudChzZWxlY3Rvciwgbm9kZSl7XG5cdFx0aWYobm9kZSA9PSB1bmRlZmluZWQpe1xuXHRcdFx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG5cdFx0fVxuXHRcdHJldHVybiBub2RlLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG5cdH1cblxuXHRzdGF0aWMgZ2V0RWxlbWVudHMoc2VsZWN0b3IsIG5vZGUpe1xuXHRcdGlmKG5vZGUgPT0gdW5kZWZpbmVkKXtcblx0XHRcdHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuXHRcdH1cblx0XHRyZXR1cm4gbm9kZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxuXHR9XG59IiwiaW1wb3J0IHsgVXRpbCB9IGZyb20gXCIuLi9oZWxwZXJzL3V0aWxcIlxuaW1wb3J0IHsgTWVzc2FnZVZpZXcgfSBmcm9tIFwiLi4vdmlld3MvbWVzc2FnZVZpZXdcIlxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VTZW5kZXJ7XG5cblx0Y29uc3RydWN0b3IoZWxlbWVudCwgY2hhdFVpKXtcblx0XHRpZihlbGVtZW50ID09IHVuZGVmaW5lZCl7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmFibGUgdG8gY29uZWN0IHRvIHNlbmRlciB1aVwiKVxuXHRcdH1cblx0XHR0aGlzLmNoYXRVaSA9IGNoYXRVaVxuXHRcdHRoaXMuaW5pdChlbGVtZW50KVxuXHR9XG5cblx0aW5pdChlbGVtZW50KXtcblx0XHR0aGlzLm9ic2VydmUoZWxlbWVudClcblx0fVxuXG5cdG9ic2VydmUoZWxlbWVudCl7XG5cdFx0dGhpcy5lbGVtZW50ID0gVXRpbC5nZXRFbGVtZW50KFwiI21lc3NhZ2VcIiwgZWxlbWVudClcblx0XHR0aGlzLnNlbmRCdXR0b24gPSBVdGlsLmdldEVsZW1lbnQoXCJidXR0b25cIiwgZWxlbWVudClcblx0XHR0aGlzLmhhbmRsZUZvY3VzT2JzZXJlcigpXG5cdH1cblxuXHRoYW5kbGVGb2N1c09ic2VyZXIoKXtcblx0XHR0aGlzLnNlbmRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLnNlbmRNZXNzYWdlLmJpbmQodGhpcykpXG5cdFx0dGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5vYnNlcnZlSWZGb2N1c2VkLmJpbmQodGhpcykpXG5cdFx0dGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLm9ic2VydmVJZk5vdEZvY3VzZWQuYmluZCh0aGlzKSlcblx0fVxuXG5cdG9ic2VydmVJZkZvY3VzZWQoKXtcblx0XHR0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB0aGlzLm9ic2VydmVLZXlzLmJpbmQodGhpcykpXG5cdH1cblxuXHRvYnNlcnZlSWZOb3RGb2N1c2VkKCl7XG5cdFx0dGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdGhpcy5vYnNlcnZlS2V5cylcblx0fVxuXG5cdG9ic2VydmVLZXlzKGV2ZW50KXtcblx0XHRpZihldmVudC5rZXlDb2RlID09IDEzICYmIHRoaXMuZWxlbWVudC52YWx1ZS5sZW5ndGgpe1xuXHRcdFx0dGhpcy5zZW5kTWVzc2FnZSgpXG5cdFx0fVxuXHR9XG5cblx0c2VuZE1lc3NhZ2UoKSB7XG5cdFx0bGV0IG1lc3NhZ2UgPSB0aGlzLmVsZW1lbnQudmFsdWVcblx0XHRcblx0XHRpZihtZXNzYWdlLmxlbmd0aCA8PTApe1xuXHRcdFx0cmV0dXJuXG5cdFx0fVxuXG5cdFx0bGV0IG1lc3NhZ2VWaWV3ID0gbmV3IE1lc3NhZ2VWaWV3KFV0aWwuZ2V0RWxlbWVudChcIi5tZXNzYWdlLWxpc3RcIiwgdGhpcy5jaGF0VWkpKVxuXG5cdFx0bWVzc2FnZVZpZXcuYXBwZW5kKHtcblx0XHRcdHNlbmRlcjogXCJNZVwiLFxuXHRcdFx0bWVzc2FnZTogdGhpcy5lbGVtZW50LnZhbHVlLFxuXHRcdFx0c2VudDogdHJ1ZVxuXHRcdH0pXG5cblx0XHR0aGlzLmVsZW1lbnQudmFsdWUgPSBcIlwiXG5cdFx0Y29uc29sZS5sb2cobWVzc2FnZSlcblx0fVxufSIsImltcG9ydCB7IFZpZXcgfSBmcm9tIFwiLi92aWV3LmpzXCJcblxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VWaWV3IGV4dGVuZHMgVmlld3tcblxuXHRjb25zdHJ1Y3RvcihlbGVtZW50byl7XG5cdFx0c3VwZXIoZWxlbWVudG8pXG5cdH1cblx0XG5cblx0dGVtcGxhdGUobW9kZWwpXG5cdHtcblx0XHRsZXQgc2VudENsYXNzID0gbW9kZWwuc2VudCA/IFwic2VudFwiIDogXCJyZWNlaXZlZFwiXG5cdFx0bGV0IGVycm9yID0gbW9kZWwuZXJyb3IgPyBcIiBlcnJvclwiIDogXCJcIlxuXHRcdHJldHVybiBgPGxpIGNsYXNzPVwiJHtzZW50Q2xhc3N9JHtlcnJvcn1cIj5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cInNlbmRlclwiPiR7bW9kZWwuc2VuZGVyfTogPC9zcGFuPiBcblx0XHRcdFx0XHQke21vZGVsLm1lc3NhZ2V9XG5cdFx0XHRcdDwvbGk+YFxuXHR9XG59XG5cblxuIiwiZXhwb3J0IGNsYXNzIFZpZXd7XG5cdFxuXHRjb25zdHJ1Y3RvcihlbGVtZW50byl7XG5cdFx0dGhpcy5fZWxlbWVudG8gPSBlbGVtZW50b1xuXHR9XG5cblx0dGVtcGxhdGUoKXtcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ1RoZSBfdGVtcGxhdGUgbWV0aG9kIG11c3QgYmUgaW1wbGVtZW50ZWQnKVxuXHR9XG5cblx0YXBwZW5kKG9iail7XG5cdFx0bGV0IGVsZW1lbnQgPSB0aGlzLnRlbXBsYXRlKG9iaik7XG5cdFx0dGhpcy5fZWxlbWVudG8uaW5zZXJ0QWRqYWNlbnRIVE1MKCAnYmVmb3JlZW5kJywgZWxlbWVudCApO1xuXHR9XG59Il19
