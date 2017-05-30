/**
* Objeto que contém as variáveis e funções que serão executadas na página principal
* da aplicação
*/
var App = (function(){
  /**
  * Inicia um objeto do tipo Chat
  */
  var chat = new Chat(document.getElementById("listChat"));

  return {

    /**
    * Exemplo de onde a função "loadChatHistory" poderia estar estruturada no objeto
    * principal da aplicação.
    */
    init: function () {
      chat.loadChatHistory();
    },

    /**
    * Inicia um objeto do tipo Mensagem e o adiciona ao chat
    */
    sendMessage: function () {
      var message = new Message(document.getElementById("inputMessage").value).getMessage();
      chat.addMessageToChat(message);
      document.getElementById("inputMessage").value = '';
    }
  }
})();

/**
* Listener que escuta evento de click no botão "Enviar", e executa o envio da messagem
*/
document.getElementById("btnSendMessage").addEventListener("click", function(){
  App.sendMessage();
});

/**
* Listener que escuta o evento de teclar ENTER no campo de input da mensagem, e a envia
*/
document.getElementById("inputMessage").addEventListener("keypress", function(e){
  if(e.keyCode === 13){
    App.sendMessage();
  }
});
