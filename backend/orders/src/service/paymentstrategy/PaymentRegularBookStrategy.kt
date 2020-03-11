package challenge.service.paymentstrategy

import challenge.model.Payment

class PaymentRegularBookStrategy: PaymentStrategy {
    override fun pay(payment: Payment) {
        println("PaymentRegularBookStrategy")
    }
}