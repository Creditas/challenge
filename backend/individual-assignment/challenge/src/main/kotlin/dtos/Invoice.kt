package org.example.dtos

import org.example.models.impl.Order

data class Invoice(val order: Order) {
    val billingAddress: Address = order.address
    val shippingAddress: Address = order.address
}
