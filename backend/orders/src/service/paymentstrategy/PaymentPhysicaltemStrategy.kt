package challenge.service.paymentstrategy

import challenge.model.Payment
import challenge.model.ProductType
import challenge.model.ShippingLabel

class PaymentPhysicalItemStrategy : PaymentStrategy {

    private val shippingService = ShippingService()

    override fun pay(payment: Payment) {
        val shippingLabel = ShippingLabel(notification = "Product being shipped", items = payment.order.items.filter { it.product.type == ProductType.PHYSICAL })
        shippingService.shipProduct(shippingLabel)
    }


}