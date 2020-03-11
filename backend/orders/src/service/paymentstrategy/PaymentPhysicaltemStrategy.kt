package challenge.service.paymentstrategy

import challenge.model.Payment

class PaymentPhysicalItemStrategy : PaymentStrategy {

    override fun pay(payment: Payment) {
        println("PaymentPhysicalItemStrategy")
    }


}