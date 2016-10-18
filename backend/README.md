## Desafio para Backend Software Engineer

Você está revisando as decisões de design de um software que processa Pedidos online. Por estes pedidos, são realizados pagamentos que
recebem tratamentos a depender as situações específicas de cada um como segue:

  - Se o pagamento for para um item físico, você deverá gerar um `shipping label` para o mesmo ser colocado na caixa do envio;
  - Caso o pagamento seja uma assinatura de serviço, você precisa ativar a assinatura, e notificar o usuário através de e-mail sobre isto;
  - Caso o pagamento seja um livro comum, você precisa gerar o `shipping label` com uma notificação de que trata-se de um item isento de impostos
conforme disposto na Constituição Art. 150, VI, d.
  - Caso o pagamento seja de alguma mídia digital (música, vídeo), além de enviar a descrição da compra por e-mail ao comprador, conceder um voucher de desconto de R$ 10 ao comprador associado ao pagamento.

# Teste Adriano Wiermann

__Pagamento Item Físico__

Foi criado um método shipping_label dentro de Payment que é instanciado em Invoice que em seguida é utilizado no momento de notificação para o comprador em um método notify! dentro de Customer.

__Pagamento Membership__

Foi criado uma classe Membership que é instanciada se o payment_membership.pay? for true e dispara uma notificação através do método notify!.

__Pagamento Livro__

É o mesmo caso que Item Físico, porém com uma condição diferente quando é um livro.

__Pagamento Mídia Digital__

Dentro da classe Customer ao instanciar um objeto customer, é inicializado uma variável voucher com valor inicial 0. Essa variável é então incrementada com mais 10 valores caso o digital_payment.paid? for true.
