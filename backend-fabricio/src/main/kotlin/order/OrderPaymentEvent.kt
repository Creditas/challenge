package order

enum class OrderPaymentEventType {
    MEMBERSHIP,
    DIGITAL
}

abstract class OrderPaymentEvent(val eventType: OrderPaymentEventType, val order: Order) {
    abstract fun handle()
}