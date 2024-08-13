package challenge.services.strategy

import challenge.domain.entities.Payment
import challenge.domain.interfaces.PaymentProcessor

class PhysicalItemStrategy(private val payment: Payment) : PaymentProcessor {
    override fun process() {
        generateLabel()
    }

    private fun generateLabel() {
        println("Generating label for physical item")
    }

}