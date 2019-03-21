import java.util.Date

data class Payment(val order: Order, val paymentMethod: PaymentMethod) {

    fun paidOut() {
        paidAt = Date()

        EventManager.publish(OrderEvents.Consts.OrderPaidOut, order)
    }

    var paidAt: Date? = null
    val amount = order.totalAmount
}