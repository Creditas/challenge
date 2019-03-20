abstract class Invoice(val order: Order, val orderItem: List<OrderItem>) {

    abstract fun generateShippingLabel(): String

    val billingAddress: Address = order.address
    val shippingAddress: Address = order.address

    companion object {
        fun createInfoice(type: ProductType, order: Order, orderItem: List<OrderItem>) : Invoice  =
            when (type) {
                ProductType.BOOK -> BookInvoice(order, orderItem)
                ProductType.DIGITAL -> DigitalInvoice(order, orderItem)
                ProductType.MEMBERSHIP -> MembershipInvoice(order, orderItem)
                ProductType.PHYSICAL -> PhysicalInvoice(order, orderItem)
            }
    }
}