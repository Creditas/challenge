var creditas = creditas || {};

creditas.chat = (function(){
  'use strict';

  function init(){
    general();
  }

  function general() {
    document.getElementById("cred-btn__send").addEventListener("click", function(e) {
      var msg = e.currentTarget.previousElementSibling.value;
      var inputTag = e.currentTarget.previousElementSibling;
      var msgBox = e.currentTarget.parentElement.previousElementSibling;
      if (msg != "") {
        sendMessage(msg, msgBox);
        removeTextFromInput(inputTag); 
      }
    }, false);

    document.getElementById("cred-input__text").addEventListener("keypress", function(e) { 
      var pressedKey = e.which || e.keyCode;
      if (pressedKey == 13) {
        var msg = e.currentTarget.value;
        var msgBox = e.currentTarget.parentElement.previousElementSibling;
        var inputTag = e.currentTarget;
        if (msg != "") {
          sendMessage(msg, msgBox); 
          removeTextFromInput(inputTag);           
        }
      }
    }, false);
  }

  function sendMessage(msg, msgBox) {
    var listNode = document.createElement("li")
    var textNode = document.createTextNode(msg);
    listNode.setAttribute("class", "sent-message");
    listNode.appendChild(textNode)
    msgBox.appendChild(listNode);
    listNode.scrollIntoView();
  }

  function removeTextFromInput(inputTag) {
    inputTag.value = "";
  }

  return {
    init: init
  }

}());
