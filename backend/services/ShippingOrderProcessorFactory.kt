package challenge.services

import challenge.model.OrderItem

class ShippingOrderProcessorFactory(private val processors: List<ShippingOrderProcessor>) {

    fun build(orderItem: OrderItem):ShippingOrderProcessor{
        return this.processors.filter { p->p.supports(orderItem) }.firstOrNull()
                ?: throw RuntimeException("Product Type not supported: $orderItem")

    }

}