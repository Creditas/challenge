class DispatcherEvent : Event<Order> {

    override fun handler(order: Order) {
        println("Pedido ${order} a ser gerado notas fiscais")

        order.generateInvoices()

        println("Pedido ${order} gerou ${order.invoices.count()} notas fiscais")
    }

}