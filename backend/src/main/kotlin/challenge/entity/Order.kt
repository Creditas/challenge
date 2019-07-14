package challenge.entity

import challenge.model.Address
import challenge.model.OrderItem
import challenge.model.PaymentMethod
import java.util.Date

class Order(val customer: Customer, val address: Address) {
    private val items = mutableListOf<OrderItem>()
    var closedAt: Date? = null
        private set
    var payment: Payment? = null
        private set
    val totalAmount
        get() = items.sumByDouble { it.total }

    fun addProduct(product: Product, quantity: Int) {
        val productAlreadyAdded = items.any { it.product == product }
        if (productAlreadyAdded)
            throw Exception("The product have already been added. Change the amount if you want more.")

        items.add(OrderItem(product, quantity))
    }

    fun getOrderItems(): List<OrderItem> {
        return items.toList()
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

    fun isPayed() = payment != null

}


