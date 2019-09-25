package com.creditas.challenge.model

data class Invoice(private val order: Order) {
    val items = order.items
    val subtotal = order.subtotal()
    val otherCosts = order.feesAndDiscounts
    val grandTotal = order.grandTotal()
    val billingAddress = order.paymentMethod.billingAddress
    val shipments = (order as? PhysicalOrder)?.shippingAddress
}
