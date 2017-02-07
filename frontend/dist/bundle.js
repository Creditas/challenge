/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatBox; });


class ChatBox {

    constructor(chatId, store, rootElement, components) {
        this.store = store;
        this.chatId = chatId;
        this.rootElement = rootElement;
        this.components = components;

        this.el = document.createElement('div');
        this.el.id = this.chatId;
        this.el.className += 'chat';

        this.render();
    }

    render() {
        this.components.forEach(component => {
            let c = new component(this.chatId, this.store);
            this.el.append(c);
        });

        document.querySelector(`${this.rootElement}`).append(this.el);
    }

}



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ChatMessageList__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ChatNavigation__ = __webpack_require__(5);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return components; });





let components = [__WEBPACK_IMPORTED_MODULE_0__ChatMessageList__["a" /* ChatMessageList */], __WEBPACK_IMPORTED_MODULE_1__ChatNavigation__["a" /* ChatNavigation */]];



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return uidGenerator; });


const uidGenerator = () => {
  let rn = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(15).substring(1);
  };

  return 'chat-' + rn() + rn() + '-' + rn() + '-' + rn();
};

const detectEnterKey = evt => {
  if (evt) {}
};



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PubSub; });


class PubSub {
	constructor() {
		this.handlers = [];
	}

	subscribe(event, handler, context) {
		if (context === 'undefined') context = handler;
		this.handlers.push({
			event: event,
			handler: handler.bind(context)
		});
	}

	publish(event, ...args) {
		this.handlers.forEach(topic => {
			if (topic.event === event) topic.handler(args);
		});
	}
}



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__templates_chat_messagelist__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatMessageList; });



/**
 * @class ChatMessageList
 * @description Listen to new messages, and show then on the screen
 * 
 * @param chatId
 * @param store
 */
class ChatMessageList {
    constructor(chatId, store) {
        this.chatId = chatId;
        this.store = store;

        this.el = document.createElement('div');
        this.el.innerHTML = __WEBPACK_IMPORTED_MODULE_0__templates_chat_messagelist__["a" /* CHATMESSAGELIST_TEMPLATE */];
        this.el.className += 'chat__messages';

        this.setListeners(this.chatId);
        return this.el;
    }

    /**
     * @method setListeners
     * @param chatId
     */
    setListeners(chatId) {
        this.store.subscribe('SEND_MESSAGE', args => {
            if (args[0] == this.chatId) {
                this.addMessage(args[0], args[1]);
            }
        });
    }

    /**
     * @method addMessage
     * @param chatId
     * @param message
     */
    addMessage(chatId, message) {
        let messageEl = document.createElement('li');
        messageEl.innerHTML = message;

        if (this.chatId === chatId) {
            this.el.firstChild.appendChild(messageEl);
        }
    }

}



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__templates_chat_navigation__ = __webpack_require__(7);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatNavigation; });




/**
 * @class ChatNavigation
 * @description Responsible for all the navigation part (chat text input, chat send button,
 *              and all future plugins/functionalities that will be added later);
 * @param chatId 
 * @param store 
 *              
 */

class ChatNavigation {
    constructor(chatId, store) {
        this.chatId = chatId;
        this.store = store;

        this.el = document.createElement('div');
        this.el.innerHTML = __WEBPACK_IMPORTED_MODULE_0__templates_chat_navigation__["a" /* CHATNAVIGATION_TEMPLATE */];
        this.el.className += 'chat__nav';

        this.setListeners();

        return this.el;
    }

    /**
     * @method setListeners
     */
    setListeners() {
        this.el.querySelector(`.chat__sendbutton`).addEventListener('click', () => {
            this.sendMessage(this.chatId);
        });
    }

    /**
     * @method sendMessage
     * @param chatId;
     */
    sendMessage(chatId) {
        let msgInput = this.el.querySelector('input');

        if (msgInput.value === null || msgInput.value === '') return;

        this.store.publish('SEND_MESSAGE', chatId, msgInput.value);

        msgInput.value = '';
        msgInput.focus();
    }
}



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CHATMESSAGELIST_TEMPLATE; });


const CHATMESSAGELIST_TEMPLATE = `<ul class="messages__list"></ul>`;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CHATNAVIGATION_TEMPLATE; });


const CHATNAVIGATION_TEMPLATE = `
    <input type="text" class="chat__input" />
    <button type="button" class="chat__sendbutton">Enviar</button>
`;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_utils_pubsub__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_utils_index__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_ChatBox__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_components_index__ = __webpack_require__(1);





/**
 * @class ChatApp
 * @param rootElement
 * @param store
 * @param components
 */
class ChatApp {
    constructor(rootElement, store, components) {
        this.rootElement = rootElement;
        this.store = store;
        this.components = components;
        this.id = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__app_utils_index__["a" /* uidGenerator */])();
    }

    init() {
        let chatBox = new __WEBPACK_IMPORTED_MODULE_2__app_ChatBox__["a" /* ChatBox */](this.id, this.store, this.rootElement, __WEBPACK_IMPORTED_MODULE_3__app_components_index__["a" /* components */]);
    }

}

// ============================================================================================ //
//  DOM EVENTS HERE
// ============================================================================================ //
document.addEventListener('DOMContentLoaded', function () {
    let rootEl = '#chatsContainer';

    var pubsub = new __WEBPACK_IMPORTED_MODULE_0__app_utils_pubsub__["a" /* PubSub */]();
    var chat = new ChatApp(rootEl, pubsub);
    chat.init();

    // add new chat button
    document.querySelector('.newChat').onclick = () => {
        let c = new ChatApp(rootEl, pubsub);
        c.init();
    };
});

/***/ })
/******/ ]);