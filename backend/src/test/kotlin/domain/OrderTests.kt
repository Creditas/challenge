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

        val creditCard by memoized { CreditCard("43567890-987654367") }
        val physicalProduct by memoized { Product("Flowered t-shirt", ProductType.PHYSICAL, 35.00) }
        val bookProduct by memoized { Product("The Hitchhiker's Guide to the Galaxy", ProductType.BOOK, 120.00) }

        it("Adding physicalProduct to order") {

            val orderItem = OrderItem(physicalProduct, 1)
            order.addProduct(physicalProduct, 1)
            assertTrue { order.items.contains(orderItem) }
        }

        it("Adding existing physicalProduct should throw error ") {
            val orderItem = OrderItem(physicalProduct, 1)
            order.addProduct(physicalProduct, 1)

            assertFailsWith<Exception> {
                order.addProduct(physicalProduct, 1)
            }
        }

        /* it("When adding a book should use BookShippingService") {
             //arrange
             val mock = mock<ShippingService> ()

             //act
             order.run {
                 addProduct(bookProduct, 1)
                 pay(creditCard)
             }

             //assert
             verify(mock).ProcessShipping()
         }*/
    }
})
