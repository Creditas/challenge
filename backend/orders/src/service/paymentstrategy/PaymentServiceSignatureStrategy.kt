package challenge.service.paymentstrategy

import challenge.model.Payment
import challenge.model.ProductType
import challenge.service.SignatureService

class PaymentServiceSignatureStrategy: PaymentStrategy {

    private val signatureService = SignatureService()

    override fun pay(payment: Payment) {
        println("PaymentServiceSignatureStrategy")
        val signatureItems = payment.order.items.filter { it.product.type == ProductType.MEMBERSHIP }
        signatureService.activateSignature(customer = payment.order.customer, items = signatureItems)
    }
}