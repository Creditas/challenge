package domain.invoice

import domain.address.Address
import domain.order.Order

data class Invoice(val order: Order) {
    val billingAddress: Address = order.address
    val shippingAddress: Address = order.address
}