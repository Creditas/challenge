package main.challenge.services

import main.challenge.domain.*
import main.challenge.notifications.*

class SubscriptionService(orderItem: OrderItem, private val payment: Payment?) {
    private val product: Product = orderItem.product

    fun activateMembership() {
        val customer: Customer = payment!!.order.customer

        customer.addMembership(product)

        EmailNotifyer().notify(customer, getCustomerNotification())
    }

    private fun getCustomerNotification(): Notification {
        return SubscriptionNotification("Your subscription to the product ${product.name} was activate with success")
    }
}

