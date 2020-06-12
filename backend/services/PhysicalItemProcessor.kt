package challenge.services

import challenge.model.Customer
import challenge.model.OrderItem
import challenge.model.ProductType

class PhysicalItemProcessor : ShippingOrderProcessor{

    override fun supports(order: OrderItem): Boolean {
        return ProductType.PHYSICAL == order?.product?.type
    }

    override fun process(customer: Customer, order: OrderItem) {
        createShippingLabel(order)
    }

    fun createShippingLabel(item: OrderItem) {
        println("Creating shipping label: $item")
    }
}