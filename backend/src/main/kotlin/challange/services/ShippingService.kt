package main.challenge.services

import main.challenge.domain.*
import main.challenge.notifications.*

interface ShippingService {
    fun ProcessShipping()
}

class PhysicalShippingService : ShippingService {
    var shippingLabel: ShippingLabel
        private set

    constructor (orderItem: OrderItem, payment: Payment) {
        shippingLabel = ShippingLabel(orderItem, payment)
    }

    override fun ProcessShipping() {
        println(shippingLabel.getLabel())
    }
}

class BookShippingService(orderItem: OrderItem, payment: Payment) : ShippingService {
    var shippingLabel: ShippingLabel
        private set

    val shippingNotification: ShippingNotification = ShippingNotification(
        "Item isento de impostos conforme disposto na Constituição Art. 150, VI, d."
    )

    init {
        shippingLabel = ShippingLabel(orderItem, payment, shippingNotification)
    }

    override fun ProcessShipping() {
        println(shippingLabel.getLabel())
    }
}

class DigitalShippingService(val orderItem: OrderItem, val payment: Payment) : ShippingService {
    override fun ProcessShipping() {
        val discount = Discount(10.0)

        payment.addDiscount(discount)

        val shippingMessage: String = "Sending ${orderItem.product.name} to " +
        "customer ${payment.customer().name} at " +
        "email ${payment.customer().email}. Also giving $discount " +
        "dollars of discount." +
        "\nFinal price: ${payment.amount} "

        println(shippingMessage)

        notifyShippingToCustomer()
    }

    private fun notifyShippingToCustomer() {
        EmailNotifyer().notify(payment.order.customer, getCustomerNotification())
    }

    private fun getCustomerNotification(): Notification {
        return DigitalItemSentNotification("Item ${orderItem.product.name} was sent to you")
    }
}
