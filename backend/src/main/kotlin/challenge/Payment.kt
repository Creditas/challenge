package challenge

import java.util.Date


interface PaymentMethod

data class CreditCard(val number: String) : PaymentMethod

data class Payment(val order: Order, val paymentMethod: PaymentMethod) {
    val paidAt = Date()
    val authorizationNumber = paidAt.time
    val amount = order.totalAmount

    val invoice = Invoice(order)
}
