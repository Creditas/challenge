package challenge.service

import challenge.entity.Order
import challenge.entity.Subscription
import challenge.model.OrderItem

class SubscriptionService private constructor() {
    companion object {
        val instance = SubscriptionService()
    }

    fun subscribe(order: Order, orderItem: OrderItem): Subscription {
        val subscription = Subscription(order.customer, orderItem)
        println("Subscrive customer to $orderItem")
        // save in DB

        // Return saved subscription
        return subscription
    }
}
