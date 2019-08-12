package domain.order

import domain.address.Address
import domain.customer.Customer
import domain.payment.ProductType
import domain.product.Product
import domain.product.Product.*
import org.junit.Assert
import org.junit.Assert.*
import org.junit.Before
import org.junit.Test

class OrderTest {

    private val physicalProduct = Physical(
            name = "Pants",
            price = 5.0,
            type = ProductType.PHYSICAL
    )

    private val digitalProduct = Digital(
            name = "Music",
            price = 12.0,
            type = ProductType.DIGITAL
    )

    private val items: MutableList<OrderItem> = mutableListOf(
            OrderItem(physicalProduct, 2), OrderItem(digitalProduct, 1)
    )

    private val order: Order by lazy {
        Order(
                customer = Customer(),
                address = Address(),
                closedAt = null,
                payment = null,
                items = items
        )
    }

    @Test
    fun `should return total amount of order items`() {
        val expectedAmount = 22.0
        val totalAmount = order.totalAmount()

        assertEquals(expectedAmount, totalAmount, 1.0)
    }

    @Test
    fun `should add product successfully`() {
        val spotify = Signature(
                name = "Spotify Premium",
                price = 16.90,
                type = ProductType.MEMBERSHIP
        )

        val orderItem = OrderItem(spotify, 1)

        order.addProduct(spotify, 1)

        assertTrue(order.items.contains(orderItem))
    }
}