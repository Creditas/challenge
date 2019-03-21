## Desafio para Backend Software Engineer

Você está revisando as decisões de design de um software que processa Pedidos online. Por estes pedidos, são realizados pagamentos que recebem tratamentos a depender as situações específicas de cada um como segue:

  - Se o pagamento for para um item físico, você deverá gerar um `shipping label` para o mesmo ser colocado na caixa do envio;
  - Caso o pagamento seja uma assinatura de serviço, você precisa ativar a assinatura, e notificar o usuário através de e-mail sobre isto;
  - Caso o pagamento seja um livro comum, você precisa gerar o `shipping label` com uma notificação de que trata-se de um item isento de impostos conforme disposto na Constituição Art. 150, VI, d.
  - Caso o pagamento seja de alguma mídia digital (música, vídeo), além de enviar a descrição da compra por e-mail ao comprador, conceder um voucher de desconto de R$ 10 ao comprador associado ao pagamento.

__Abordagem__

1. Event-Driven Architecture
  
Para a resolução do problema foi utilizado o conceito de Event-Driven Architecture visto a facilidade que o modelo oferece para o controle  das regras de negócio que devem ser atendidas a partir de um evento e pela facilidade que o mesmo oferece para realizar alterações de regra ou de fluxos.

Entre as vantagens de utilizar evento com um sistema de fila é:
* permitir que as integrações operem de modo asincrono permitindo integrações mais rápidas
* permitir que as aplicações que estejam processando os eventos seja escalo de forma horizontal conforme volume de processamento
* permitir que o processamento rode de forma paralela de forma fácil, visto que a captura do evento pode rodar em máquinas distintas e assim agilizar o processamento total do pedido

Foi gerado um EventManager em memória mas que poderia ser uma abstração para um Kafka ou RabbitMQ, afim de permitir um controle e divulgação do evento em um ecosistema clusterizado para permitir uma maior performance.

O que também facilita a configuração conforme código abaixo
```java
    EventManager.subscribe<Order>(OrderEvents.Consts.CreatedOrder, PaymentEvent())
    EventManager.subscribe<Order>(OrderEvents.Consts.OrderPaidOut, DispatcherEvent())

    EventManager.subscribe<Invoice>(OrderEvents.Consts.CreatedInvoice, MembershipInvoiceNotificationEvent())
    EventManager.subscribe<Invoice>(OrderEvents.Consts.CreatedInvoice, InvoiceEmailEvent())

    EventManager.subscribe<Invoice>(OrderEvents.Consts.CreatedInvoice, DigitalInvoiceNotificationEvent())
    EventManager.subscribe<Invoice>(OrderEvents.Consts.CreatedInvoice, GenerateCreditEvent())

    EventManager.subscribe<Invoice>(OrderEvents.Consts.CreatedInvoice, ShippingLabelEvent())
```

Log da aplicação e dos eventos processados no pedido
```
Iniciando Challange
Configurando EventManager
Inicializando EventManager
Inscrevendo event class PaymentEvent no tópico pedido_criado
Criando tópico pedido_criado
Inscrevendo event class DispatcherEvent no tópico pedido_pago
Criando tópico pedido_pago
Inscrevendo event class MembershipInvoiceNotificationEvent no tópico nota_gerada
Criando tópico nota_gerada
Inscrevendo event class InvoiceEmailEvent no tópico nota_gerada
Inscrevendo event class GenerateCreditEvent no tópico nota_gerada
Inscrevendo event class ShippingLabelEvent no tópico nota_gerada
Gerando pedido
Pedido gerado
Lançado tópico pedido_criado
Tópico pedido_criado capturado pelo PaymentEvent@55b5535b
Pedido class Order.4e16b163-ee3e-42a3-ae4d-3ad359d11016 a ser pago
Lançado tópico pedido_pago
Pedido class Order.4e16b163-ee3e-42a3-ae4d-3ad359d11016 pago
Tópico pedido_pago capturado pelo DispatcherEvent@6a9c11f
Pedido class Order.4e16b163-ee3e-42a3-ae4d-3ad359d11016 a ser gerado notas fiscais
Lançado tópico nota_gerada
Tópico nota_gerada capturado pelo MembershipInvoiceNotificationEvent@55ec2973
Tópico nota_gerada capturado pelo InvoiceEmailEvent@7232775
Tópico nota_gerada capturado pelo GenerateCreditEvent@2410eb3b
Tópico nota_gerada capturado pelo ShippingLabelEvent@1778b700
Lançado tópico nota_gerada
Geração de shipping label da nota class PhysicalInvoice.b726d371-36da-4639-ae97-cbcb117693ec
Shipping label [Envio de caixa para Rua General Osório 494 - São Caetano] da nota class PhysicalInvoice.b726d371-36da-4639-ae97-cbcb117693ec gerada
Tópico nota_gerada capturado pelo MembershipInvoiceNotificationEvent@55ec2973
Tópico nota_gerada capturado pelo InvoiceEmailEvent@7232775
Notificação de assinatura do pedido class MembershipInvoice.20a7a96c-c4ed-4e0c-87be-68f123cf5168 a ser enviada
Email do pedido class MembershipInvoice.20a7a96c-c4ed-4e0c-87be-68f123cf5168 a ser enviada
Notificação de assinatura do pedido  class MembershipInvoice.20a7a96c-c4ed-4e0c-87be-68f123cf5168 enviada
Email do pedido class MembershipInvoice.20a7a96c-c4ed-4e0c-87be-68f123cf5168 enviada
Tópico nota_gerada capturado pelo GenerateCreditEvent@2410eb3b
Tópico nota_gerada capturado pelo ShippingLabelEvent@1778b700
Lançado tópico nota_gerada
Tópico nota_gerada capturado pelo MembershipInvoiceNotificationEvent@55ec2973
Tópico nota_gerada capturado pelo InvoiceEmailEvent@7232775
Tópico nota_gerada capturado pelo GenerateCreditEvent@2410eb3b
Tópico nota_gerada capturado pelo ShippingLabelEvent@1778b700
Geração de shipping label da nota class BookInvoice.04ba0358-7fd2-4ab5-ab30-ee456a30a728
Lançado tópico nota_gerada
Shipping label [Envio de livro para Rua General Osório 494 - São Caetano - Item isento de impostos conforme disposto na Constituição Art. 150, VI, d.] da nota class BookInvoice.04ba0358-7fd2-4ab5-ab30-ee456a30a728 gerada
Tópico nota_gerada capturado pelo MembershipInvoiceNotificationEvent@55ec2973
Tópico nota_gerada capturado pelo InvoiceEmailEvent@7232775
Tópico nota_gerada capturado pelo GenerateCreditEvent@2410eb3b
Email do pedido class DigitalInvoice.0de82c7a-967b-418d-a82f-1b15ecfaebac a ser enviada
Pedido class Order.4e16b163-ee3e-42a3-ae4d-3ad359d11016 gerou 4 notas fiscais
Tópico nota_gerada capturado pelo ShippingLabelEvent@1778b700
Geraçãp de cupom de desconto da nota class DigitalInvoice.0de82c7a-967b-418d-a82f-1b15ecfaebac sobre mídia digital
Email do pedido class DigitalInvoice.0de82c7a-967b-418d-a82f-1b15ecfaebac enviada
Cupm de R$10 gerado para nota class DigitalInvoice.0de82c7a-967b-418d-a82f-1b15ecfaebac sobre mídia
```
2. Invoice

Foram criadas invoices distintas para permitir que cada tipo possa ser processado conforme necessidades e também permitir eventos distintos conforme seu tipo.

* `PhysicalInvoice` e `BookInvoice`, em geral toda invoice deveria gerar o `shipping label` no entanto mídias digitais não há integrável físico, então não há implementação. No entanto há regras distintas entre produtos físicos ou livros, onde cada xInvoice trata sua regras específica
* `MembershipInvoice` permite ser capturado pelo evento que deve enviar email e sua assinatura
* `DigitalInvoice` permite ser capturado pelo evento que deve enviar email e gerar um cupom