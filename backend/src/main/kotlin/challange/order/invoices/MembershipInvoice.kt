class MembershipInvoice(order: Order, orderItem: List<OrderItem>) : Invoice(order, orderItem) {

    override fun generateShippingLabel(): String {
        throw NotImplementedError()
    }
}