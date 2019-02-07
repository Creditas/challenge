package order

import shipping.ShippingLabel

class Book(name: String, price: Double) : Product(name, price) {
    private val bookShippingLabelNotification = "Este item é isento de impostos conforme disposto na Constituição Art. 150, VI, d."

    override fun pay(payment: Payment) {
        payment.order.addShippingLabel(ShippingLabel(payment.order.id.toString(), bookShippingLabelNotification))
    }
}