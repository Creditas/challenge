package br.com.jsc.challenge.domain.specifications

import br.com.jsc.challenge.domain.Order
import br.com.jsc.challenge.domain.ProductType
import br.com.jsc.challenge.domain.ShippingStep
import br.com.jsc.challenge.domain.VoucherShippingStep

class VoucherShippingStepSpec : ShippingStepSpec() {
    private final val defaultVoucherValue: Double = 10.0

    override var shippingStep: ShippingStep? = null

    override fun isSatisfiedBy(target: Order): Boolean {
        val isSatisfied = target.items.any { it.product.type == ProductType.DIGITAL }

        if (isSatisfied) {
            shippingStep = VoucherShippingStep(target, defaultVoucherValue)
        }

        return isSatisfied
    }
}