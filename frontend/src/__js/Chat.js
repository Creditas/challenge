/**
* Objeto que armazena os atributos e métodos referentes ao elemento do Chat
* Recebe o elemento DOM referente ao chat
*/
var Chat = function(chatElement) {

  /**
  * Armazena o elemento do DOM que representa o chat
  */
  var chat = chatElement;

  /**
  * Exemplo de função que futuramente poderá iterar sobre um objeto do tipo
  * Histórico e carregar as mensagens anteriores ao momento atual, em que o
  * usuário logado enviou para outro usuário específico.
  * O Objeto Histórico poderá realizar long-polling request para o backend
  * através de seus métodos específicos e retornar apenas o resultado para esta
  * função.
  */
  function loadChatHistory(historico){
    // TODO
  };

  return {

    /**
    * Recebe um objeto do tipo Mensagem e adiciona seu conteúdo em um elemento
    * de lista, que por sua vez é adicionado ao elemento de chat
    */
    addMessageToChat: function (message) {
      if (message) {
        var ul = chat;
        var li = document.createElement("li");

        li.appendChild(document.createTextNode(message));
        li.setAttribute('class', 'message');
        ul.appendChild(li);
        ul.scrollTop = ul.scrollHeight - ul.clientHeight;
      }
    }
  }
};
