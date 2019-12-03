package challenge.infrastructure.repositories.business

import challenge.infrastructure.repositories.payment.PaymentMethod
import java.util.*

data class Payment(val order: Order, val paymentMethod: PaymentMethod) {
    val paidAt = Date()
    val authorizationNumber = paidAt.time
    val amount = order.totalAmount
    val invoice = Invoice(order)
}