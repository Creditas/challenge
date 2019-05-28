package challenge.services

import challenge.model.Customer
import challenge.model.OrderItem

interface ShippingOrderProcessor{
    fun supports(order: OrderItem):Boolean
    fun process(customer: Customer, order:OrderItem)
}