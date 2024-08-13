package challenge.domain.entities

import challenge.domain.interfaces.PaymentMethod
import challenge.domain.validators.ProductValidator
import java.lang.Exception
import java.util.*

class Order(val customer: Customer, val address: Address) {
    private val items = mutableListOf<OrderItem>()
    var closedAt: Date? = null
        private set
    var payment: Payment? = null
        private set
    val totalAmount
        get() = items.sumOf { it.total }

    fun addProduct(product: Product, quantity: Int) {
        ProductValidator.validate(items, product)
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
