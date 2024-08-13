package challenge.domain.entities

import challenge.domain.exceptions.ProductAlreadyAddedException
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows

class OrderTest {

    @Test
    fun `should add product to order`() {
        val order = Order(Customer(), Address())
        val product = Product("Test Product", ProductType.PHYSICAL, 10.0)

        order.addProduct(product, 1)

        assert(order.totalAmount == 10.0)
    }

    @Test
    fun `should throw exception when adding duplicate product`() {
        val order = Order(Customer(), Address())
        val product = Product("Test Product", ProductType.PHYSICAL, 10.0)

        order.addProduct(product, 1)

        assertThrows<ProductAlreadyAddedException> {
            order.addProduct(product, 1)
        }
    }
}