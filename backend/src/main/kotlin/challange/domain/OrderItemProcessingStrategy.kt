package main.challenge.domain

interface OrderItemProcessingStrategy {
    fun processOrderItem(orderItem: OrderItem, payment: Payment?)
}

class PhysicalItemProcessingStrategy : OrderItemProcessingStrategy {
    override fun processOrderItem(orderItem: OrderItem, payment: Payment?) {
        val shippingService =
            PhysicalShippingService(orderItem, payment)

        shippingService.ProcessShipping()
    }
}

class BookItemProcessingStrategy : OrderItemProcessingStrategy {
    override fun processOrderItem(orderItem: OrderItem, payment: Payment?) {
        val shippingService =
            BookShippingService(orderItem, payment)

        shippingService.ProcessShipping()
    }
}

class DigitalItemProcessingStrategy : OrderItemProcessingStrategy {
    override fun processOrderItem(orderItem: OrderItem, payment: Payment?) {
        val shippingService =
            DigitalShippingService(orderItem, payment)

        shippingService.ProcessShipping()
    }
}

class MembershipItemProcessingStrategy : OrderItemProcessingStrategy {
    override fun processOrderItem(orderItem: OrderItem, payment: Payment?) {
        val subscriptionService = SubscriptionService(orderItem, payment)

        subscriptionService.activateMembership()
    }
}
