package challenge.services

import challenge.infrastructure.repositories.business.*
import challenge.infrastructure.repositories.payment.PaymentMethod

class OrderService {
    companion object {
        @JvmStatic
        fun createOrder(products : List<OrderItem>, customer: Customer, address: Address) : Order {
            val order = Order(customer, address)

            products.forEach {
                order.addItem(it)
            }

            return order
        }

        @JvmStatic
        fun pay(order: Order, method: PaymentMethod) : Order {
            val payment = Payment(order, method)
            order.close(payment)
            return order
        }
    }
}