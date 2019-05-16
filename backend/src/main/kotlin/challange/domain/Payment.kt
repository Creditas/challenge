package main.challenge.domain

import java.util.*

data class Payment(val order: Order, val paymentMethod: PaymentMethod) {
    val paidAt = Date()
    val authorizationNumber = paidAt.time

    val amount
        get() = order.totalAmount - discount!!.value

    val invoice = Invoice(order)

    var discount: Discount? = null
        private set

    fun addDiscount(discount: Discount): Unit {
        this.discount = discount
    }
}

data class CreditCard(val number: String) : PaymentMethod

interface PaymentMethod

data class Invoice(val order: Order) {
    val billingAddress: Address = order.address
    val shippingAddress: Address = order.address
}