package challenge.strategies

import challenge.models.Order

interface PaymentProcessingStrategy {
    fun processPayment(order: Order)
}