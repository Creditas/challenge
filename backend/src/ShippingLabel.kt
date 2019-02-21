package challenge

data class ShippingNotification(val notification: String)

class ShippingLabel(val orderItem: OrderItem,
                    val payment: Payment?,
                    val shippingNotification: ShippingNotification? = null) {

    fun getLabel() : String {
            var shippingMessage : String = "Shipping item ${this?.orderItem?.product.name} to " +
                    "customer ${this.payment?.order?.customer?.email} at " +
                    "address ${this?.payment?.invoice?.shippingAddress.toString()}"

            this?.shippingNotification?.let {
                shippingMessage = shippingMessage.plus("- Notification: ${it}")
            }

            return shippingMessage
        }
}