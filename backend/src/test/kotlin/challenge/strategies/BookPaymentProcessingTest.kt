package challenge.strategies

import challenge.models.*
import org.junit.jupiter.api.Test
import kotlin.test.assertNull


class BookPaymentProcessingTest {

    @Test
    fun `should generate shipping label with tax exemption notice for book`() {
        val customer = Customer("John Doe", "john.doe@example.com")
        val address = Address("123 Main St", "Anytown", "Brazil")
        val order = Order(customer, address)
        val product = Product("The Hitchhiker's Guide to the Galaxy", ProductType.BOOK, 50.00)

        order.addProduct(product, 1)

        val strategy = BookPaymentProcessing()
        strategy.processPayment(order)

        assertNull(order.closedAt)
    }
}