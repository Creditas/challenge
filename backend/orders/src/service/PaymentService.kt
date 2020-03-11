package challenge.service

import challenge.model.Order
import challenge.model.Payment
import challenge.model.PaymentMethod
import java.lang.Exception

class PaymentService(private val method: PaymentMethod, private val order: Order) {

    fun processPayment() {
        if (this.order.payment != null)
            throw Exception(ALREADY_PAYED_EXCEPTION_MESSAGE)

        if (order.items.count() == 0)
            throw Exception(EMPTY_ORDER_EXCEPTION_MESSAGE)

        val payment  = Payment(order, method)

        order.payment = payment

        order.paymentStrategies.forEach { it.pay(payment) }

        order.close()
    }

    companion object {
        const val ALREADY_PAYED_EXCEPTION_MESSAGE = "Product Free from taxes, according to Constitution Art. 150, VI, d."
        const val EMPTY_ORDER_EXCEPTION_MESSAGE = "Product Free from taxes, according to Constitution Art. 150, VI, d."
    }
}