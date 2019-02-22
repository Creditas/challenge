package main.challenge.domain

interface ShippingService {
    fun ProcessShipping()
}

class PhysicalShippingService : ShippingService {
    var shippingLabel: ShippingLabel
        private set

    constructor (orderItem: OrderItem, payment: Payment?) {
        shippingLabel = ShippingLabel(orderItem, payment)
    }

    override fun ProcessShipping() {
        println(shippingLabel.getLabel())
    }
}

class BookShippingService(orderItem: OrderItem, payment: Payment?) : ShippingService {
    var shippingLabel: ShippingLabel
        private set

    val shippingNotification: ShippingNotification = ShippingNotification(
        "Item isento de impostos " +
                "conforme disposto na Constituição Art. 150, VI, d."
    )

    init {
        shippingLabel = ShippingLabel(orderItem, payment, shippingNotification)
    }

    override fun ProcessShipping() {
        println(shippingLabel.getLabel())
    }

}

class DigitalShippingService(orderItem: OrderItem, payment: Payment?) : ShippingService {
    var shippingLabel: ShippingLabel
        private set

    init {
        shippingLabel = ShippingLabel(orderItem, payment)
    }

    override fun ProcessShipping() {
        val discount = Discount(10.0)

        shippingLabel.payment?.addDiscount(discount)

        val shippingMessage: String = "Sending ${shippingLabel.orderItem.product} to " +
                "customer ${shippingLabel.payment?.order?.customer} at " +
                "email ${shippingLabel.payment?.order?.customer?.email}. Also giving ${discount} " +
                "dollars of discount." +
                "\nFinal price: ${shippingLabel.payment?.amount} "

        println(shippingMessage)
    }

    private fun notifyShippingToCustomer() {
        EmailNotifyer().notify(shippingLabel.payment?.order?.customer, GetCustomerNotification())
    }

    private fun GetCustomerNotification(): Notification {
        return DigitalItemSentNotification("Item ${shippingLabel.orderItem.product.name} was sent to you")
    }
}