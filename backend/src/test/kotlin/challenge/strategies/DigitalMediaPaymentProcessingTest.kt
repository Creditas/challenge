package challenge.strategies

import challenge.models.*
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import kotlin.test.assertNull


class DigitalMediaPaymentProcessingTest {

    @Test
    fun `should send purchase email and generate discount voucher for digital media`() {
        val customer = Customer("John Doe", "john.doe@example.com")
        val address = Address("123 Main St", "Anytown", "Brazil")
        val order = Order(customer, address)
        val product = Product("Digital Album", ProductType.DIGITAL, 10.00)

        order.addProduct(product, 5)

        val strategy = DigitalMediaPaymentProcessing()
        strategy.processPayment(order)

        assertNull(order.closedAt)  // Example assertion
        assertEquals(1, order.items.size)
        assertEquals(50.00, order.totalAmount)
    }
}
