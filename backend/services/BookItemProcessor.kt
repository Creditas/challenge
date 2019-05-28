package challenge.services

import challenge.model.Customer
import challenge.model.OrderItem
import challenge.model.ProductType

class BookItemProcessor : ShippingOrderProcessor{

    override fun supports(order: OrderItem): Boolean {
        return ProductType.BOOK == order?.product?.type
    }

    override fun process(customer: Customer, order: OrderItem) {
        createShippingLabel(order)
    }

    fun createShippingLabel(item: OrderItem) {
        println("Creating shipping label: $item [isento de impostos conforme disposto na Constituição Art. 150, VI, d]")
    }

}