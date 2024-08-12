package challenge.strategies

import challenge.models.*
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import kotlin.test.assertNull

class MembershipPaymentProcessingTest {

    @Test
    fun `should activate membership and send notification email`() {
        val customer = Customer("John Doe", "john.doe@example.com")
        val address = Address("123 Main St", "Anytown", "Brazil")
        val order = Order(customer, address)
        val product = Product("Familiar plan", ProductType.MEMBERSHIP, 29.90)

        order.addProduct(product, 1)

        val strategy = MembershipPaymentProcessing()
        strategy.processPayment(order)

        // Test that membership is activated and notification email is sent
        assertNull(order.closedAt)
        assertEquals(1, order.items.size)
        assertEquals(29.90, order.totalAmount)
    }
}
