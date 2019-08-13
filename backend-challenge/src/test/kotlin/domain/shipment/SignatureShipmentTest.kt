package domain.shipment

import domain.payment.ProductType
import domain.product.Signature
import org.junit.Assert
import org.junit.Test

class SignatureShipmentTest {

    private val signatureShipment by lazy {
        SignatureShipment()
    }

    @Test
    fun `should activate signature successfully`() {
        val signature = Signature(
                name = "netflix",
                type = ProductType.MEMBERSHIP,
                price = 25.0,
                isActivated = false
        )

        val signatureActivated = signatureShipment.shipping(signature)

        Assert.assertTrue(signatureActivated.isActivated)
    }
}