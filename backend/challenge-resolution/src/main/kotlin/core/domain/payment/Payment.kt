package main.kotlin.core.domain.payment

import main.kotlin.core.domain.invoice.Invoice
import main.kotlin.core.domain.order.Order
import java.util.*

data class Payment(val order: Order, val paymentMethod: PaymentMethod) {
    val paidAt = Date()
    val authorizationNumber = paidAt.time
    val amount = order.totalAmount
    val invoice = Invoice(order)
}