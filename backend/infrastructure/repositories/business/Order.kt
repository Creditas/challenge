package challenge.infrastructure.repositories.business

import java.util.*

class Order(val customer: Customer, val address: Address) {
    var items = mutableListOf<OrderItem>()
        private set
    var closedAt: Date? = null
        private set
    var payment: Payment? = null
        private set
    val totalAmount
        get() = items.sumByDouble { it.total }

    fun addItem(orderItem: OrderItem) {
        var productAlreadyAdded = items.any { it.product == orderItem.product }
        if (productAlreadyAdded)
            throw Exception("The product have already been added. Change the amount if you want more.")

        items.add(orderItem)
    }

    fun close(payment: Payment) {
        this.payment = payment

        if (this.payment == null)
            throw Exception("Order without payment can not be closed!")

        if (items.count() == 0)
            throw Exception("Empty order can not be closed!")

        closedAt = Date()
    }
}