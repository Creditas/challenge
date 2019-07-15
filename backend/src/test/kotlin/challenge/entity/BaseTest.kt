package challenge.entity

import challenge.enum.ProductType
import challenge.model.Address
import challenge.model.CreditCard
import challenge.model.OrderItem
import kotlin.test.BeforeTest

open class BaseTest {
    protected lateinit var invoice: Invoice
    protected lateinit var order: Order
    protected lateinit var payment: Payment
    protected lateinit var product: Product
    protected lateinit var orderItem: OrderItem

    @BeforeTest
    fun setUp() {
        order = Order(Customer(), Address())
        order.addProduct(Product("Flowered t-shirt", ProductType.PHYSICAL, 35.00), 2)
        order.addProduct(Product("Familiar plan", ProductType.MEMBERSHIP, 29.90), 1)
        order.addProduct(Product("The Hitchhiker's Guide to the Galaxy", ProductType.BOOK, 120.00), 1)
        order.addProduct(Product("Stairway to Heaven", ProductType.DIGITAL, 5.00), 1)

        payment = Payment(order, CreditCard("0000-0000-0000-0000"))
        invoice = Invoice(order)

        product = Product("New Product", ProductType.MEMBERSHIP, 15.5)
        order.addProduct(product, 2)
        orderItem = OrderItem(product, 2)
    }
}
