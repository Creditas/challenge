var appCreditas = angular.module('appCreditas', []);
appCreditas.controller('appCreditasCtrl', ['$scope', '$http', function ($scope, $http) {

  /**
	 * Funcao ng-click ao clicar no botao <btn-envia-mensagem>
	 * @param <mensagem> este parametro representa o valor inserido pelo usuario
	 */
  $scope.enviaMensagem = function(mensagem) {
    var conversa = document.querySelector("#conversa");
    conversa.appendChild(listaMensagem(mensagem));

    /***
    //* Para comunicacao cliente-servidor
     $scope.enviaServidor(mensagem);
    */
  }

  /**
	 * Funcao para comunicacao com o servidor
   * realizando requisição POST e enviando uma estrutura de dados
   * contendo <mensagem>
	 * @param <mensagem> este parametro representa o valor inserido pelo usuario
	 */
  $scope.enviaServidor = function (mensagem) {
    var baseUrl = 'URL';
    var dataObj = {
        mensagem : mensagem
    };
    var res = $http.post(baseUrl, mensagem);
    res.success(function(data, status, headers, config){
        console.log(status);
        console.log(data);
    });
    res.error(function(data, status, headers, config){
        $scope.ResponseDetails = "Data: " + data +
         "<hr />status: " + status +
         "<hr />headers: " + header +
         "<hr />config: " + config;
    });
  }

  /**
	 * Funcao de listagem de mensagens, criando elemento <"li">
	 * @param <mensagem> este parametro representa o valor inserido pelo usuario
	 */
   function listaMensagem(mensagem) {
    var montaMensagem = document.createElement("li");
    montaMensagem.textContent = mensagem;
    return montaMensagem;
  };

}]);
