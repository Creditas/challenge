**Explicação da implementação**

Para o problema dos pedidos online, que depois do pagamento recebem diferentes tratamento, foi implementado diferentes tipos de notificações.

Primeiro, é criado um enum para classificar os tipo de notificações que devem ser enviadas, por exemplo, por email ou impressão.

A partir disso, a classe notificação classifica os produtos de cada ordem, salvando os métodos que serão utilizados numa lista. Lembrando que, alguns produtos possuem mais de um tipo de notificação. Essa classe também é responsável por enviar o email ou imprimir o label.

As strings 'strNotificationLabel' e 'strNotificationEmail' irão salvar o que precisa ser impresso e o que precisa ser enviado por email, repectivamente. Se no futuro, um produto precisar imprimir um label e enviar um email, não precisa modificar a forma do texto, pois essas strings são separadas.

Após, o método 'ClassifyNotification' fazer a classificação do produto e qual método deve ser usado para notificar o cliente, o método 'defineStringNotification' irá montar o texto que deve ser enviado de acordo com o tipo da notificação (NotificationType). 

Dois testes foram criados. Primeiro, o 'test_one' testa a classifação dos labels dos produtos. Nesse caso ele testa se o produto do tipo 'book' recebe a classificação certa. O 'test\_two' testa a função 'printOrderDetails', a qual imprime os detalhes da compra (tipo e nome do produto).
