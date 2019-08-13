package domain.shipment

import domain.payment.ProductType
import domain.product.Physical
import org.junit.Assert
import org.junit.Test

class PhysicalShipmentTest {

    private val physicalShipment by lazy {
        PhysicalShipment()
    }

    @Test
    fun `should return physical product with shipping label successfully`() {
        val expectedShippingLabel = ShippingLabel(notification = null)
        val physical = Physical(
                name = "Playstation 4",
                type = ProductType.PHYSICAL,
                price = 400.0
        )

        val physicalWithShippingLabel = physicalShipment.shipping(physical)

        Assert.assertNotNull(physicalWithShippingLabel.shippingLabel)
        Assert.assertEquals(expectedShippingLabel.notification, physicalWithShippingLabel.shippingLabel?.notification)
    }
}