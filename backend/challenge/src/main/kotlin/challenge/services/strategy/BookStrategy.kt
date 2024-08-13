package challenge.services.strategy

import challenge.domain.entities.Payment
import challenge.domain.interfaces.PaymentProcessor

class BookStrategy(private val payment: Payment) : PaymentProcessor {
    override fun process() {
        generateLabel()
    }

    private fun generateLabel() {
        println("Generating shipping label for book with tax exemption notice")
    }
}