class BookInvoice(order: Order, orderItem: List<OrderItem>) : Invoice(order, orderItem) {

    override fun generateShippingLabel(): String {
        return "Envio de livro para ${shippingAddress.toString()} - Item isento de impostos conforme disposto na Constituição Art. 150, VI, d."
    }

}