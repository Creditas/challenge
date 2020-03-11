package challenge.service.paymentstrategy

import challenge.model.ShippingLabel

class ShippingService {

    fun shipProduct(shippingLabel: ShippingLabel) {
        println("Product being shipped with label: $shippingLabel")
    }
}