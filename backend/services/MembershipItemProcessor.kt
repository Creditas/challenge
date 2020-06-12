package challenge.services

import challenge.model.Customer
import challenge.model.OrderItem
import challenge.model.ProductType

class MembershipItemProcessor : ShippingOrderProcessor{

    override fun supports(order: OrderItem): Boolean {
        return ProductType.MEMBERSHIP == order?.product?.type
    }

    override fun process(customer: Customer, order: OrderItem) {
        sendActivateMail(customer,order)
    }

    fun sendActivateMail(customer: Customer, order: OrderItem) {
        println("Sending Activate mail to $customer about ${order.product.name}")
    }

}