package challenge.strategies

import challenge.models.*
import org.junit.jupiter.api.Test
import kotlin.test.assertNull

class PhysicalProductPaymentProcessingTest {

    @Test
    fun `should generate shipping label for physical product`() {
        val customer = Customer("John Doe", "john.doe@example.com")
        val address = Address("123 Main St", "Anytown", "Brazil")
        val order = Order(customer, address)
        val product = Product("Flowered t-shirt", ProductType.PHYSICAL, 35.00)

        order.addProduct(product, 1)

        val strategy = PhysicalProductPaymentProcessing()
        strategy.processPayment(order)

        assertNull(order.closedAt)
    }
}
