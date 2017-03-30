## Desafio para Backend Software Engineer

Você está revisando as decisões de design de um software que processa Pedidos online. Por estes pedidos, são realizados pagamentos que recebem tratamentos a depender as situações específicas de cada um como segue:

  - Se o pagamento for para um item físico, você deverá gerar um `shipping label` para o mesmo ser colocado na caixa do envio;
  - Caso o pagamento seja uma assinatura de serviço, você precisa ativar a assinatura, e notificar o usuário através de e-mail sobre isto;
  - Caso o pagamento seja um livro comum, você precisa gerar o `shipping label` com uma notificação de que trata-se de um item isento de impostos conforme disposto na Constituição Art. 150, VI, d.
  - Caso o pagamento seja de alguma mídia digital (música, vídeo), além de enviar a descrição da compra por e-mail ao comprador, conceder um voucher de desconto de R$ 10 ao comprador associado ao pagamento.

__Soluçāo Proposta__

Existem varios tipos de `Invoice`, cada um com sua classe correspondente. Ao realizar o pagamento é instanciado um tipo de invoice diferente para cada grupo de
produtos que existem no `Order`. Se por acaso no futuro houver a necessidade de se
criar outro tipo de invoice basta apenas criar uma nova classe sem necessidade
de se modificar o resto do sistema, seguindo assim o segundo principio do SOLID. Open/closed classes. A mesma ideia pode ser usada para os metodos de pagamento.
