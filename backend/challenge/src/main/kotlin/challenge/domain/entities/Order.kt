package challenge.domain.entities

import challenge.domain.interfaces.PaymentMethod
import challenge.domain.interfaces.OrderValidator
import challenge.domain.validators.AlreadyPaidValidator
import challenge.domain.validators.EmptyOrderValidator
import challenge.domain.validators.ProductValidator
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
        EmptyOrderValidator.validate(this)
        AlreadyPaidValidator.validate(this)
        payment = Payment(this, method)
        close()
    }

    private fun close() {
        closedAt = Date()
    }
}
