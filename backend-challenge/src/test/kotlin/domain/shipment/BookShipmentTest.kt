package domain.shipment

import domain.payment.ProductType
import domain.product.Book
import org.junit.Assert
import org.junit.Test

class BookShipmentTest {

    private val bookShipment: BookShipment by lazy {
        BookShipment()
    }

    @Test
    fun `should return book product with shipping label successfully`() {
        val expectedShippingLabel = ShippingLabel(notification = "free from taxes")
        val book = Book(
                name = "The Lord of the Rings",
                price = 25.0,
                type = ProductType.BOOK
        )

        val bookWithShippingLabel = bookShipment.shipping(book)

        Assert.assertNotNull(bookWithShippingLabel.shippingLabel?.notification)
        Assert.assertEquals(expectedShippingLabel.notification, bookWithShippingLabel.shippingLabel?.notification)
    }
}