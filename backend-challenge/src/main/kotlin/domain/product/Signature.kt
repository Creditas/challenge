package domain.product

import domain.payment.ProductType
import domain.shipment.SignatureShipment

data class Signature(
        val name: String,
        val type: ProductType = ProductType.MEMBERSHIP,
        val price: Double,
        val isActivated: Boolean = false
) : Product() {

    override fun shipmentStrategy() = SignatureShipment()

    fun activate() = this.copy(isActivated = true)
}