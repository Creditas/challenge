class PhysicalInvoice(order: Order, orderItem: List<OrderItem>) : Invoice(order, orderItem) {

    override fun generateShippingLabel(): String {
        return "Envio de caixa para ${shippingAddress.toString()}"
    }

}