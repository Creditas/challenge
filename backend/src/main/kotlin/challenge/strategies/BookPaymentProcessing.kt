package challenge.strategies

import challenge.models.Order

class BookPaymentProcessing : PaymentProcessingStrategy {
    override fun processPayment(order: Order) {
        println("Generating shipping label for book with tax exemption notification...")
        generateShippingLabelWithTaxExemption(order)
    }

    private fun generateShippingLabelWithTaxExemption(order: Order) {
        // Method call placeholder for shipping label generation with tax exemption
        println("Shipping label with tax exemption notice generated for book.")
    }
}