package main.kotlin.core.domain.order

import main.kotlin.core.domain.address.Address
import main.kotlin.core.domain.customer.Customer
import main.kotlin.core.domain.payment.Payment
import main.kotlin.core.domain.payment.PaymentMethod
import main.kotlin.core.domain.product.Book
import main.kotlin.core.domain.product.Digital
import main.kotlin.core.domain.product.Physical
import main.kotlin.core.domain.product.Product
import main.kotlin.core.domain.voucher.Voucher
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

    fun shipItems() {
        items.forEach{ it.product.ship(this.customer) }
    }
}