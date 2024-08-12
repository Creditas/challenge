package challenge.strategies

import challenge.model.Order

class PhysicalProductPaymentProcessing : PaymentProcessingStrategy {
    override fun processPayment(order: Order) {
        println("Generating shipping label for physical product...")
        generateShippingLabel(order)
    }

    private fun generateShippingLabel(order: Order) {
        // Method call placeholder for shipping label generation
        println("Shipping label generated for physical product.")
    }
}