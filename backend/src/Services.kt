package challenge

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

class BookShippingService : ShippingService {
    var shippingLabel: ShippingLabel
        private set

    val shippingNotification: ShippingNotification = ShippingNotification(
        "Item isento de impostos " +
                "conforme disposto na Constituição Art. 150, VI, d."
    )

    constructor (orderItem: OrderItem, payment: Payment?) {
        shippingLabel = ShippingLabel(orderItem, payment, shippingNotification)
    }

    override fun ProcessShipping() {
        println(shippingLabel.getLabel())
    }

}

class DigitalShippingService : ShippingService {
    var shippingLabel: ShippingLabel
        private set

    constructor (orderItem: OrderItem, payment: Payment?) {
        shippingLabel = ShippingLabel(orderItem, payment)
    }

    override fun ProcessShipping() {
        var shippingMessage: String = "Shipping item ${shippingLabel.orderItem.product} to " +
                "customer ${shippingLabel.payment?.order?.customer} at " +
                "address ${shippingLabel.payment?.invoice?.shippingAddress}"

        println(shippingMessage)
    }

    private fun notifyShippingToCustomer() {
        EmailNotifyer().Notify(shippingLabel.payment?.order?.customer, GetCustomerNotification())
    }

    private fun GetCustomerNotification(): Notification {
        return DigitalItemSentNotification("Item ${shippingLabel.orderItem.product.name} was sent to you")
    }
}

class SubscriptionService(val orderItem: OrderItem, val payment: Payment?) {
    val product: Product = orderItem.product

    fun activateMembership() {
        val customer: Customer? = payment?.order?.customer

        customer?.addMembership(product)

        EmailNotifyer().Notify(customer, GetCustomerNotification())
    }

    private fun GetCustomerNotification(): Notification {
        return SubscriptionNotification(
            "Your subscription to the product " +
                    "${product.name} was activate with sucess'"
        )
    }
}

interface Notification {
    var value: String
}

class SubscriptionNotification(override var value: String) : Notification

class DigitalItemSentNotification(override var value: String) : Notification

interface Notifyer {
    fun Notify(customer: Customer?, notification: Notification)
}

class EmailNotifyer : Notifyer {
    override fun Notify(customer: Customer?, notification: Notification) {
        println("Sending email to customer ${customer?.email} with content ${notification.value}")
    }
}