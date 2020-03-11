package challenge.service

import challenge.Order
import challenge.model.Payment
import challenge.model.PaymentMethod
import java.lang.Exception

class PaymentService(private val method: PaymentMethod, private val order: Order) {

    fun pay() {
        if (this.order.payment != null)
            throw Exception("The order has already been paid!")

        if (order.items.count() == 0)
            throw Exception("Empty order can not be paid!")

        order.payment = Payment(order, method)

        order.close()
    }
}