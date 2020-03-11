package challenge.service.paymentstrategy

import challenge.model.Payment
import challenge.model.ShippingLabel

class PaymentPhysicalItemStrategy : PaymentStrategy {

    private val shippingService = ShippingService()

    override fun pay(payment: Payment) {
        val shippingLabel = ShippingLabel(notification = "Product being shipped", order = payment.order)
        shippingService.shipProduct(shippingLabel)
    }


}