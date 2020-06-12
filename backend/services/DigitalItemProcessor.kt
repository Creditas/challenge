package challenge.services

import challenge.model.Customer
import challenge.model.OrderItem
import challenge.model.ProductType

class DigitalItemProcessor : ShippingOrderProcessor{

    override fun supports(order: OrderItem): Boolean {
        return ProductType.DIGITAL == order?.product?.type
    }


    override fun process(customer: Customer, order: OrderItem) {
        sendDescriptionMail(customer,order)
        generateVoucher(customer)
    }

    private fun generateVoucher(customer: Customer) {
        println("Generating 10% Voucher to $customer.")

    }

    fun sendDescriptionMail(customer: Customer, order: OrderItem) {
        println("Sending Product Description mail to $customer about ${order.product.name}")
    }
}