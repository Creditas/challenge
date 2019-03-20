## Desafio para Backend Software Engineer

Você está revisando as decisões de design de um software que processa Pedidos online. Por estes pedidos, são realizados pagamentos que recebem tratamentos a depender as situações específicas de cada um como segue:

  - Se o pagamento for para um item físico, você deverá gerar um `shipping label` para o mesmo ser colocado na caixa do envio;
  - Caso o pagamento seja uma assinatura de serviço, você precisa ativar a assinatura, e notificar o usuário através de e-mail sobre isto;
  - Caso o pagamento seja um livro comum, você precisa gerar o `shipping label` com uma notificação de que trata-se de um item isento de impostos conforme disposto na Constituição Art. 150, VI, d.
  - Caso o pagamento seja de alguma mídia digital (música, vídeo), além de enviar a descrição da compra por e-mail ao comprador, conceder um voucher de desconto de R$ 10 ao comprador associado ao pagamento.

__Abordagem__
Para a resolução do problema foi utilizado o conceito de Event-Driven Architecture visto a facilidade que o modelo oferece para o controle do que deve ser feito a partir de um evento e pela facilidade que o mesmo oferece para realizar alterações de regra ou de fluxos.

Foi gerado um EventManager em memória mas que poderia ser uma abstração para um Kafka ou RabbitMQ, afim de permitir um controle e divulgação do evento em um ecosistema clusterizado para permitir uma maior performance.

O que também facilita a configuração conforme código abaixo
```java
    EventManager.subscribe<Order>(OrderEvents.Consts.CreatedOrder, PaymentEvent())
    EventManager.subscribe<Order>(OrderEvents.Consts.OrderPaidOut, DispatcherEvent())

    EventManager.subscribe<Invoice>(OrderEvents.Consts.CreatedInvoice, MembershipInvoiceNotificationEvent())
    EventManager.subscribe<Invoice>(OrderEvents.Consts.CreatedInvoice, MembershipInvoiceEmailEvent())

    EventManager.subscribe<Invoice>(OrderEvents.Consts.CreatedInvoice, DigitalInvoiceNotificationEvent())
    EventManager.subscribe<Invoice>(OrderEvents.Consts.CreatedInvoice, GenerateCreditEvent())

    EventManager.subscribe<Invoice>(OrderEvents.Consts.CreatedInvoice, ShippingLabelEvent())
```