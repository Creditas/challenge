package domain.order

import domain.address.Address
import domain.customer.Customer
import domain.order.exceptions.OrderAlreadyPayed
import domain.order.exceptions.PayEmptyOrderException
import domain.payment.Payment
import domain.payment.PaymentMethod
import domain.product.Product
import domain.product.exceptions.ProductAlreadyAddedException
import domain.shipment.ShipmentContext
import java.util.*
import kotlin.properties.Delegates

data class Order(
        val customer: Customer,
        val address: Address,
        val items: MutableList<OrderItem> = mutableListOf()
) {

    var closedAt: Date? = null
    var payment: Payment? by Delegates.observable<Payment?>(null) { _, _, _ ->
        items.forEach { ShipmentContext.prepareProductToShipping(it.product) }
    }

    fun totalAmount() = items.sumByDouble { it.total }

    fun addProduct(product: Product, quantity: Int) {
        val productAlreadyAdded = items.any { it.product == product }
        if (productAlreadyAdded)
            throw ProductAlreadyAddedException("The product have already been added. Change the amount if you want more.")

        items.add(OrderItem(product, quantity))
    }

    fun pay(method: PaymentMethod) {
        if (payment != null)
            throw OrderAlreadyPayed("The order has already been paid!")

        if (items.count() == 0)
            throw PayEmptyOrderException("Empty order can not be paid!")

        payment = Payment(this, method)
        closedAt = Date()
    }
}