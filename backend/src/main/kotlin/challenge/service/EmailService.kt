package challenge.service

import challenge.entity.DiscountVoucher
import challenge.entity.Order
import challenge.entity.Subscription
import challenge.model.OrderItem

class EmailService private constructor() {
    companion object {
        fun instance() = EmailService()
    }

    fun sendPurchaseDescription(order: Order, orderItem: OrderItem) {
        println("Sending purchase description email for $orderItem")
        // add to queue
    }

    fun sendSubscription(subscription: Subscription) {
        println("Sending subscription email for $subscription")
        // add to queue
    }

    fun sendDiscountVoucher(discountVoucher: DiscountVoucher) {
        println("Sending discountVoucher email for $discountVoucher")
        // add to queue
    }
}
