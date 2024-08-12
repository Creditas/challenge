package challenge.strategies

import challenge.model.Order

interface PaymentProcessingStrategy {
    fun processPayment(order: Order)
}