package challenge.entity

import challenge.model.OrderItem

data class Subscription (
    val customer: Customer,
    val orderItem: OrderItem
)
