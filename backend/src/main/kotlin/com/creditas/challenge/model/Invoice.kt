package com.creditas.challenge.model

data class Invoice(private val order: Order) {

    val items = order.items
    val subtotal = order.subtotal()
    val otherCosts = order.feesAndDiscounts
    val grandTotal = order.grandTotal()
    val billingAddress = order.paymentMethod.billingAddress
    val parcels by lazy {
        if (order.type == OrderType.PHYSICAL) {
            (order as PhysicalOrder).parcels()
        }
        else {
            listOf()
        }
    }
}
