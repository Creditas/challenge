App = {
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

        var showMessage = function() {
            var listMessage = document.getElementsByClassName('message-list')[0];
            var liElement = document.createElement('li');
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

App.utils.addEvent(window, 'load', function() {
    App.message();
});
