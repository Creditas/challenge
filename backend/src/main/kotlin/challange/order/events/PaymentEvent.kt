class PaymentEvent : Event<Order> {

    override fun handler(order: Order) {
        println("Pedido ${order} a ser pago")

        order.payment?.paidOut()

        println("Pedido ${order} pago")
    }

}