package challenge.service.paymentstrategy

import challenge.model.Payment

class PaymentDigitalStrategy: PaymentStrategy {

    override fun pay(payment: Payment) {
        println("PaymentDigitalStrategy")

    }
}