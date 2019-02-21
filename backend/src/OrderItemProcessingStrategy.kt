package challenge

/* rules
* Se o pagamento for para um item físico, você deverá gerar um shipping label para o mesmo ser colocado na caixa do envio;
*
Caso o pagamento seja uma assinatura de serviço, você precisa ativar a assinatura, e notificar o usuário através de e-mail sobre isto;

Caso o pagamento seja um livro comum, você precisa gerar o shipping label com uma notificação de que trata-se de um item isento de impostos
conforme disposto na Constituição Art. 150, VI, d.

Caso o pagamento seja de alguma mídia digital (música, vídeo), além de enviar a descrição da compra por e-mail ao comprador,
conceder um voucher de desconto de R$ 10 ao comprador associado ao pagamento.
* */

interface OrderItemProcessingStrategy {
    fun processOrderItem(orderItem: OrderItem, payment: Payment?)
}

class PhysicalItemProcessingStrategy : OrderItemProcessingStrategy {
    override fun processOrderItem(orderItem: OrderItem, payment: Payment?) {
        val shippingService: ShippingService = PhysicalShippingService(orderItem, payment)
        shippingService.ProcessShipping()
    }
}

class BookItemProcessingStrategy : OrderItemProcessingStrategy {
    override fun processOrderItem(orderItem: OrderItem, payment: Payment?) {
        val shippingService: ShippingService = BookShippingService(orderItem, payment)
        shippingService.ProcessShipping()
    }
}

class DigitalItemProcessingStrategy : OrderItemProcessingStrategy {
    override fun processOrderItem(orderItem: OrderItem, payment: Payment?) {
        val shippingService: ShippingService = DigitalShippingService(orderItem, payment)
        shippingService.ProcessShipping()
    }
}

class MembershipItemProcessingStrategy : OrderItemProcessingStrategy {
    override fun processOrderItem(orderItem: OrderItem, payment: Payment?) {
        val subscriptionService: SubscriptionService = SubscriptionService(orderItem, payment)
        subscriptionService.activateMembership()
    }
}
