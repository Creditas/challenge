package challenge.service

import challenge.Order
import challenge.model.Payment
import challenge.model.PaymentMethod
import java.lang.Exception

class PaymentService(private val method: PaymentMethod, private val order: Order) {

    fun processPayment() {
        if (this.order.payment != null)
            throw Exception("The order has already been paid!")

        if (order.items.count() == 0)
            throw Exception("Empty order can not be paid!")

        val payment  = Payment(order, method)

        order.payment = payment

        order.paymentStrategies.forEach { it.pay(payment) }

        order.close()
    }
}