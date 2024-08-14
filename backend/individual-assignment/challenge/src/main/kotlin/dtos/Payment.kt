package org.example.dtos

import org.example.models.PaymentMethod
import org.example.models.impl.Order
import java.util.*

data class Payment(
    val order: Order,
    val paymentMethod: PaymentMethod
) {
    val paidAt = Date()
    val authorizationNumber = paidAt.time
    val amount = order.totalAmount
    val invoice = Invoice(order)
}
