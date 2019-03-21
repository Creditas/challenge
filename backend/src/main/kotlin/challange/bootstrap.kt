fun main(args : Array<String>) {
	println("Iniciando Challange")

    println("Configurando EventManager")
    EventManager.subscribe<Order>(OrderEvents.Consts.CreatedOrder, PaymentEvent())
    EventManager.subscribe<Order>(OrderEvents.Consts.OrderPaidOut, DispatcherEvent())

    EventManager.subscribe<Invoice>(OrderEvents.Consts.CreatedInvoice, MembershipInvoiceNotificationEvent())

    EventManager.subscribe<Invoice>(OrderEvents.Consts.CreatedInvoice, InvoiceEmailEvent())

    EventManager.subscribe<Invoice>(OrderEvents.Consts.CreatedInvoice, GenerateCreditEvent())

    EventManager.subscribe<Invoice>(OrderEvents.Consts.CreatedInvoice, ShippingLabelEvent())

    println("Gerando pedido")
    val shirt = Product("Flowered t-shirt", ProductType.PHYSICAL, 35.00)
    val netflix = Product("Familiar plan", ProductType.MEMBERSHIP, 29.90)
    val book = Product("The Hitchhiker's Guide to the Galaxy", ProductType.BOOK, 120.00)
    val music = Product("Stairway to Heaven", ProductType.DIGITAL, 5.00)

    val order = Order(Customer(), Address("Rua General Osório 494 - São Caetano"))

    order.addProduct(shirt, 2)
    order.addProduct(netflix, 1)
    order.addProduct(book, 1)
    order.addProduct(music, 1)

    order.pay(CreditCard("43567890-987654367"))

    println("Pedido gerado")

    order.close()

    Thread.sleep(1000*1)
}