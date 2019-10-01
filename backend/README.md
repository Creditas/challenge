## Desafio para Backend Software Engineer

Você está revisando as decisões de design de um software que processa Pedidos online. Por estes pedidos, são realizados pagamentos que recebem tratamentos a depender as situações específicas de cada um como segue:

  - Se o pagamento for para um item físico, você deverá gerar um `shipping label` para o mesmo ser colocado na caixa do envio;
  - Caso o pagamento seja uma assinatura de serviço, você precisa ativar a assinatura, e notificar o usuário através de e-mail sobre isto;
  - Caso o pagamento seja um livro comum, você precisa gerar o `shipping label` com uma notificação de que trata-se de um item isento de impostos conforme disposto na Constituição Art. 150, VI, d.
  - Caso o pagamento seja de alguma mídia digital (música, vídeo), além de enviar a descrição da compra por e-mail ao comprador, conceder um voucher de desconto de R$ 10 ao comprador associado ao pagamento.

__O que é necessário fazer?__

Você ficou designado a prototipar como poderá ser feita a nova versão deste fluxo de pagamento/regras de envio, pois a versão atual é frágil, **encadeada em if/else, switch/case**, exigindo modificações grandes a cada nova regra de envio/processamento inserida ou removida.

Crie as classes, métodos e suas respectivas chamadas (a seu critério) para que você consiga tratar os cenários acima.

**Não é necessário** criar as implementações para envio de e-mails, imprimir o _shipping label_, etc. Para estes casos (email, shipping label) crie apenas as chamadas de métodos, para indicar que ali seria o local aonde o envio ocorreria.

Como a proposta **não requer um código final funcionando**, não há a necessidade de implementar os testes de unidade. Entretanto, levaremos isso como _bonus points_. É permitido o uso de libs para facilitar a implementação dos testes.

__O que eu fiz?__

- Primeiro eu separei os scripts de compra em arquivos separados (buy_boook.py etc)
- Implementei a classe Costomer, que a além do nome do cliente armazena os vouchers adquiridos e se ele é membro
- Implementei uma classe Mail, para representar os atributos básicos do envio de e-mail de notificação
- Implementei a classe ShippingLabel, que recebe os dados de uma compra para entrega e com a função print retorna uma string com a informações referentes em caso de envio de livro ou não
- Implementei a classe Shipping, que recebe o resultado da efetivação da compra e procede com os desdobramentos de cada caso (marca o usuário como mebro, envia o e-mail e registra o voucher em caso de produto digital ou chama a classe ShippingLabel para gerar a etiqueta correspondente ao tipo de produto)
