package challenge.strategies

import challenge.model.Order

class DigitalMediaPaymentProcessing : PaymentProcessingStrategy {
    override fun processPayment(order: Order) {
        println("Sending purchase email and generating a R$10 discount voucher...")
        sendPurchaseEmail(order)
        generateDiscountVoucher(order)
    }

    private fun sendPurchaseEmail(order: Order) {
        // Method call placeholder for sending purchase email
        println("Purchase email sent to the user.")
    }

    private fun generateDiscountVoucher(order: Order) {
        // Method call placeholder for generating discount voucher
        println("R$10 discount voucher generated and associated with the payment.")
    }
}