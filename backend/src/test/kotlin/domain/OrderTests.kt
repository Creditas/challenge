import main.challenge.domain.*
import org.spekframework.spek2.Spek
import org.spekframework.spek2.style.specification.describe
import kotlin.test.assertFailsWith
import kotlin.test.assertTrue

object OrderTest : Spek({
    describe("Order") {
        val order by memoized {
            val customer = Customer("Pablo", "ruanmyv@gmail.com")
            Order(customer, Address())
        }

        val product by memoized { Product("Flowered t-shirt", ProductType.PHYSICAL, 35.00) }

        it("Adding product to order") {

            val orderItem = OrderItem(product, 1)
            order.addProduct(product, 1)
            assertTrue { order.items.contains(orderItem) }
        }

        it("Adding existing product should throw error ") {
            val orderItem = OrderItem(product, 1)
            order.addProduct(product, 1)

            assertFailsWith<Exception> {
                order.addProduct(product, 1)
            }
        }
    }
})
