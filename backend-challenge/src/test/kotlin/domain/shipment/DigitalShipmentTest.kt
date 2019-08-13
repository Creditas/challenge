package domain.shipment

import domain.payment.ProductType
import domain.product.Digital
import org.junit.Assert
import org.junit.Test

class DigitalShipmentTest {

    private val digitalShipment by lazy {
        DigitalShipment()
    }

    @Test
    fun `should return digital product with voucher value equal to 10 successfully`() {
        val voucher = 10.0
        val digital = Digital(
                name = "Music",
                price = 5.0,
                type = ProductType.DIGITAL,
                voucher = 0.0
        )
        val digitalProductWithVoucherValue10 = digitalShipment.shipping(digital)

        Assert.assertEquals(voucher, digitalProductWithVoucherValue10.voucher, 1.0)
    }
}