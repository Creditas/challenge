package challenge.domain.entities

import challenge.domain.entities.ProductType.PHYSICAL
import challenge.domain.exceptions.EmptyOrderException
import challenge.domain.exceptions.OrderAlreadyPaidException
import challenge.domain.exceptions.ProductAlreadyAddedException
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows

class OrderTest {

    @Test
    fun `should add product to order`() {
        val order = Order(Customer("Victor Hugo", "email@gmail.com"), Address("João Colin", "Joinville", "Brasil"))
        val product = Product("Test Product", PHYSICAL, 10.0)

        order.addProduct(product, 1)

        assert(order.totalAmount == 10.0)
    }

    @Test
    fun `should throw exception when adding duplicate product`() {
        val order = Order(Customer("Victor Hugo", "email@gmail.com"), Address("João Colin", "Joinville", "Brasil"))
        val product = Product("Test Product", PHYSICAL, 10.0)

        order.addProduct(product, 1)

        assertThrows<ProductAlreadyAddedException> {
            order.addProduct(product, 1)
        }
    }

    @Test
    fun `should throw exception when paying for empty order`() {
        val order = Order(Customer("Victor Hugo", "email@gmail.com"), Address("João Colin", "Joinville", "Brasil"))
        assertThrows<EmptyOrderException> {
            order.payOrder(CreditCard("1234-5678-9012-3456"))
        }
    }

    @Test
    fun `should throw exception when paying for already paid order`() {
        val order = Order(Customer("Victor Hugo", "email@gmail.com"), Address("João Colin", "Joinville", "Brasil"))
        val product = Product("Test Product", PHYSICAL, 10.0)
        order.addProduct(product, 1)

        order.payOrder(CreditCard("1234-5678-9012-3456"))

        assertThrows<OrderAlreadyPaidException> {
            order.payOrder(CreditCard("9876-5432-1098-7654"))
        }
    }

    @Test
    fun `should set payment when order is paid`() {
        val order = Order(Customer("Victor Hugo", "email@gmail.com"), Address("João Colin", "Joinville", "Brasil"))
        val product = Product("Test Product", PHYSICAL, 10.0)
        order.addProduct(product, 1)

        order.payOrder(CreditCard("1234-5678-9012-3456"))

        assertNotNull(order.payment)
        assertEquals(10.0, order.payment?.amount)
    }

    @Test
    fun `should set closedAt when order is paid`() {
        val order = Order(Customer("Victor Hugo", "email@gmail.com"), Address("João Colin", "Joinville", "Brasil"))
        val product = Product("Test Product", PHYSICAL, 10.0)
        order.addProduct(product, 1)

        order.payOrder(CreditCard("1234-5678-9012-3456"))

        assertNotNull(order.closedAt)
    }
}