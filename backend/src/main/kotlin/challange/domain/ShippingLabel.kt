package main.challenge.domain

data class ShippingNotification(val notification: String)

class ShippingLabel(
    val orderItem: OrderItem,
    val payment: Payment,
    val shippingNotification: ShippingNotification? = null
) {

    fun getLabel(): String {
        var shippingMessage: String = "Shipping item ${orderItem.product.name} to " +
                "customer ${payment.customer().email} at " +
                "address ${payment.invoice.shippingAddress.value}"

        this.shippingNotification?.let {
            val notification = it.notification
            shippingMessage = shippingMessage.plus(" - Notification: $notification")
        }

        return shippingMessage
    }
}

