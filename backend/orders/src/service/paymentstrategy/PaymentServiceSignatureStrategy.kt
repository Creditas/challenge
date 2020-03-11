package challenge.service.paymentstrategy

import challenge.model.Payment

class PaymentServiceSignatureStrategy: PaymentStrategy {
    override fun pay(payment: Payment) {
        println("PaymentServiceSignatureStrategy")
    }
}