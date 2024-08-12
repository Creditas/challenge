package model.strategy

import model.Order

interface PaymentProcessingStrategy {
    fun processPayment(order: Order)
}