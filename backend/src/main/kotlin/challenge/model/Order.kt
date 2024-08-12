package model

import java.util.*

class Order(val customer: Customer, val address: Address) {
    private val items = mutableListOf<OrderItem>()
    var closedAt: Date? = null
        private set
    var payment: Payment? = null
        private set
    val totalAmount: Double
        get() = items.sumOf { it.total }

    fun addProduct(product: Product, quantity: Int) {
        val productAlreadyAdded = items.any { it.product == product }
        if (productAlreadyAdded)
            throw Exception("The product has already been added. Change the amount if you want more.")

        items.add(OrderItem(product, quantity))
    }

    fun pay(method: PaymentMethod) {
        if (payment != null)
            throw Exception("The order has already been paid!")

        if (items.isEmpty())
            throw Exception("Empty order cannot be paid!")

        payment = Payment(this, method)

        // Process each item with its respective strategy
        items.forEach { item ->
            val strategy = when (item.product.type) {
                ProductType.PHYSICAL -> PhysicalProductPaymentProcessing()
                ProductType.BOOK -> BookPaymentProcessing()
                ProductType.DIGITAL -> DigitalMediaPaymentProcessing()
                ProductType.MEMBERSHIP -> MembershipPaymentProcessing()
            }
            strategy.processPayment(this)
        }

        close()
    }

    private fun close() {
        closedAt = Date()
        println("Order closed at $closedAt")
    }
}
