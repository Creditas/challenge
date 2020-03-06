package com.creditas.model

import com.creditas.service.fulfillment.FulfillmentStrategy
import java.util.*

class Order(val customer: Customer, val address: Address) {
    val items = mutableListOf<OrderItem>()
    var closedAt: Date? = null
        private set
    var payment: Payment? = null
        private set
    val totalAmount
        get() = items.sumByDouble { it.total }
    val totalItems
        get() = items.sumBy { it.quantity }

    fun addProduct(product: Product, quantity: Int) {
        if (quantity <= 0)
            throw IllegalArgumentException("Quantity must be greater than 0!")
        var productAlreadyAdded = items.any { it.product == product }
        if (productAlreadyAdded)
            throw Exception("The product have already been added. Change the amount if you want more.")

        items.add(OrderItem(product, quantity))
    }

    fun pay(method: PaymentMethod) {
        if (payment != null)
            throw Exception("The order has already been paid!")

        if (items.count() == 0)
            throw Exception("Empty order can not be paid!")

        payment = Payment(this, method)

        close()
    }

    private fun close() {
        closedAt = Date()
    }
}
