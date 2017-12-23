# Notas

Em algum momento tem que haver decisões sobre que ações tomar de acordo com os itens do pedido, então centralizei a funcionalidade na classe `OrderPostProcessor`, cujo método `#process` é chamado logo após o pagamento ser efetuado.
As validações (os `if`) ficaram todas neste método mas poderiam ser movidas para dentro das implementações se for o caso—inicialmente um caminho não me pareceu ser especialmente melhor que o outro, mas sim diferentes apenas.
Neste exemplo, as implementações das ações eram simples então foram feitas na própria classe, mas acho que ficou fácil o suficiente para extrair para outras classes conforme a necessidade.
Informações geradas como _shipping label_, estado da assinatura, etc. estão simplesmente sendo exibidos na tela, também para facilitar os testes, mas poderiam ser armazenados em outro lugar.
Quando precisei de endereços, assumi que o consumidor pode ter vários endereços mas sempre utilizei apenas o primeiro, por brevidade.
Não detalhei o funcionamento do voucher, apenas gerei um código simples e o associei ao consumidor e garanti que estivesse no invoice.
Aproveitei o incentivo dos testes para experimentar o `minitest`.  Gostei que ele tem sintaxes de testes e de especificações, optei por usar as de teste simplesmente por conta de _syntax highlighting_.
