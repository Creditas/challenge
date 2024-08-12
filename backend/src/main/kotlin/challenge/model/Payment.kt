package challenge.model

import java.util.*

data class Payment(val order: Order, val paymentMethod: PaymentMethod) {
    val paidAt: Date = Date()
    val authorizationNumber: Long = paidAt.time
    val amount: Double = order.totalAmount
    val invoice: Invoice = Invoice(order)
}