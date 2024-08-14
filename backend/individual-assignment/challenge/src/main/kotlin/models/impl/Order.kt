package org.example.models.impl

import org.example.dtos.*
import org.example.enums.*
import org.example.extension.bookProcess
import org.example.extension.digitalProcess
import org.example.extension.membershipProcess
import org.example.extension.physicalProcess
import org.example.models.PaymentMethod
import java.util.*

class Order(
    val customer: Customer,
    val address: Address
) {
    private val items = mutableListOf<OrderItem>()
    var closedAt: Date? = null
        private set
    var payment: Payment? = null
        private set
    val totalAmount
        get() = items.sumOf { it.total }

    fun addProduct(
        product: Product,
        quantity: Int
    ) {
        val productAlreadyAdded = items.any { it.product == product }
        if (productAlreadyAdded)
            throw Exception("The product have already been added. Change the amount if you want more.")

        items.add(OrderItem(product, quantity))
    }

    fun pay(method: PaymentMethod) {
        if (payment != null) {
            throw Exception("The order has already been paid!")
        }

        if (items.isEmpty()) {
            throw Exception("Empty order can not be paid!")
        }

        payment = Payment(this, method)

        close()
    }

    fun processProduct() {
        items.forEach{
            item ->
            when(item.product.type) {
                ProductType.BOOK -> bookProcess(
                    order = this
                )
                ProductType.PHYSICAL -> physicalProcess(
                    order = this
                )
                ProductType.DIGITAL -> digitalProcess(
                    order = this
                )
                ProductType.MEMBERSHIP -> membershipProcess(
                    order = this
                )
            }
        }
    }

    private fun close() {
        closedAt = Date()
    }
}