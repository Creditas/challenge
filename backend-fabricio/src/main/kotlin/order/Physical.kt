package order

import shipping.ShippingLabel

class Physical(name: String, price: Double) : Product(name, price) {
    override fun pay(payment: Payment) {
        payment.order.addShippingLabel(ShippingLabel(payment.order.id.toString()))
    }
}