package challenge.entity

import challenge.model.Address

data class Invoice(val order: Order) {
    val billingAddress: Address = order.address
    val shippingAddress: Address = order.address
}
