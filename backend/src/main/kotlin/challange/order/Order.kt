import java.util.*

class Order(val customer: Customer, val address: Address) {
    private val items = mutableListOf<OrderItem>()
    var closedAt: Date? = null
        private set
    var payment: Payment? = null
        private set
    val totalAmount
        get() = items.sumByDouble { it.total }
    var invoices = mutableListOf<Invoice>()
    var id: String = UUID.randomUUID().toString()

    fun addProduct(product: Product, quantity: Int) {
        var productAlreadyAdded = items.any { it.product == product }
        if (productAlreadyAdded)
            throw Exception("The product have already been added. Change the amount if you want more.")

        items.add(OrderItem(product, quantity))
    }

    fun pay(method: PaymentMethod) {
        if (payment != null)
            throw Exception("The order has already been paid!")

        if (items.count() == 0)
            throw Exception("Empty order can not be paid!")

        payment = Payment(this, method)
    }

    fun close() {
        closedAt = Date()
        EventManager.publish( OrderEvents.Consts.CreatedOrder, this)
    }

    fun generateInvoices() {
        items.groupBy {
            it.product.type
        }.forEach {
            var invoice = Invoice.createInfoice(it.key, this, it.value)
            invoices.add(invoice)

            EventManager.publish(OrderEvents.Consts.CreatedInvoice, invoice)
        }
    }

    override fun toString(): String {
        return "${this.javaClass}.${id}"
    }
}