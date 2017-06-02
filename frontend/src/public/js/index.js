'use strict';

window.App = {
    utils: {
        addEvent: function(elem, evt, callback, options) {
            var bubble = (options && typeof options === 'boolean') ? options : false;
            elem.addEventListener(evt, callback, bubble);
        },
        ajax: function(messageSend) {
            // This send message to server
        }
    },
    message: function() {
        var sendMessage = document.getElementById('sendMessage');
        var messageField = document.getElementById('messageField');
        var chatId = sendMessage.dataset.chatId || messageField.dataset.chatId;

        console.log(chatId);

        var showMessage = function() {

            var listMessage = document.querySelector('ul[data-chat-id="' + chatId + '"]');
            var liElement = document.createElement('li');

            if (!messageField.value) {
                return;
            }

            liElement.innerHTML = messageField.value;
            listMessage.appendChild(liElement);
            messageField.value = "";
        };

        this.utils.addEvent(sendMessage, 'click', showMessage);
        this.utils.addEvent(messageField, 'keypress', function(evt) {
            if (evt.keyCode === 13) {
                showMessage();
            }
        });
    }
};

window.App.utils.addEvent(window, 'load', function() {
    App.message();
});
