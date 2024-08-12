package challenge.models

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.Test

class OrderTest {

    @Test
    fun `should process order with multiple product types`() {
        val customer = Customer("John Doe", "john.doe@example.com")
        val address = Address("123 Main St", "Anytown", "Brazil")
        val order = Order(customer, address)

        val shirt = Product("Flowered t-shirt", ProductType.PHYSICAL, 35.00)
        val netflix = Product("Familiar plan", ProductType.MEMBERSHIP, 29.90)
        val book = Product("The Hitchhiker's Guide to the Galaxy", ProductType.BOOK, 50.00)
        val song = Product("Digital Album", ProductType.DIGITAL, 10.00)

        order.addProduct(shirt, 1)
        order.addProduct(netflix, 1)
        order.addProduct(book, 1)
        order.addProduct(song, 1)

        order.pay(CreditCard("1234-5678-9012-3456"))

        assertNotNull(order.closedAt)
        assertEquals(4, order.items.size)
        assertEquals(124.90, order.totalAmount)
    }
}
