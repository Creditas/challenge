package challenge.services.strategy

import challenge.domain.entities.Payment
import challenge.domain.interfaces.PaymentProcessor

class DigitalItemStrategy(private val payment: Payment) : PaymentProcessor {
    override fun process() {
        sendPurchaseEmail()
        grantDiscount()
    }

    private fun sendPurchaseEmail() {
        println("Sending purchase description email")
    }

    private fun grantDiscount() {
        println("Granting R$ 10 discount voucher")
    }
}