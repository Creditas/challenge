/**
* Objeto que armazena os atributos e métodos referentes ao elemento da Mensagem
* Recebe a string do texto que a mensagem representará
*/
var Message = function(text){
  /**
  * Armazena a string do texto que representará a mensagem
  */
  var text = text;

  return {

    /**
    * Verifica se o texto da mensagem existe e possui valor válido, então o retorna
    */
    getMessage: function () {
      if (text && text !== '' && typeof text !== 'undefined') {
          return text;
      }
    }
  }
};
