## Desafio para Backend Software Engineer 

Separei as classes em entidades de negócio, que deveriam conter apenas os parâmetros, a lógica deveria estar em classes específicas, porém, dado o tempo, decidi agrupar as funcionalidades dentro das entidades.

A Ordem de compra, pode incluir produtos de vários tipos, que serão agrupados e criam invoices de acordo com estes tipos. Ao gerar uma invoice, são executados os tratamentos específicos de cada tipo, como definidos abaixo:

  - Se o pagamento for para um item físico, você deverá gerar um `shipping label` para o mesmo ser colocado na caixa do envio;
  - Caso o pagamento seja uma assinatura de serviço, você precisa ativar a assinatura, e notificar o usuário através de e-mail sobre isto;
  - Caso o pagamento seja um livro comum, você precisa gerar o `shipping label` com uma notificação de que trata-se de um item isento de impostos conforme disposto na Constituição Art. 150, VI, d.
  - Caso o pagamento seja de alguma mídia digital (música, vídeo), além de enviar a descrição da compra por e-mail ao comprador, conceder um voucher de desconto de R$ 10 ao comprador associado ao pagamento.

Decidi por não implementar os testes automatizados, pois iria tomar mais tempo do que eu havia planejado.