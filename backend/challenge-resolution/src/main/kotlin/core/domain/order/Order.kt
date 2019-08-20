package main.kotlin.core.domain.order

import main.kotlin.core.domain.address.Address
import main.kotlin.core.domain.customer.Customer
import main.kotlin.core.domain.payment.Payment
import main.kotlin.core.domain.payment.PaymentMethod
import main.kotlin.core.domain.product.Product
import main.kotlin.core.domain.shipping.Shipment
import main.kotlin.core.exception.OrderAlreadyPayException
import main.kotlin.core.exception.OrderEmptyCanBePaidException
import main.kotlin.core.exception.ProductAlreadyAddedException
import java.util.*

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
            throw ProductAlreadyAddedException()

        items.add(OrderItem(product, quantity))
    }

    fun pay(method: PaymentMethod) {
        if (payment != null)
            throw OrderAlreadyPayException()

        if (items.count() == 0)
            throw OrderEmptyCanBePaidException()

        payment = Payment(this, method)

        close()
    }

    private fun close() {
        closedAt = Date()
    }

    fun shipItems() {
        items.forEach{ Shipment.shipProduct(it.product, customer) }
    }
}