package main.kotlin.core.domain.invoice

import main.kotlin.core.domain.address.Address
import main.kotlin.core.domain.order.Order

data class Invoice(val order: Order) {
    val billingAddress: Address = order.address
    val shippingAddress: Address = order.address
}