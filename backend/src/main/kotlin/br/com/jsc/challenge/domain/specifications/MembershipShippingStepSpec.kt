package br.com.jsc.challenge.domain.specifications

import br.com.jsc.challenge.domain.MembershipShippingStep
import br.com.jsc.challenge.domain.Order
import br.com.jsc.challenge.domain.ProductType
import br.com.jsc.challenge.domain.ShippingStep

class MembershipShippingStepSpec : ShippingStepSpec() {
    private final val defaultVoucherValue: Double = 10.0

    override var shippingStep: ShippingStep? = null

    override fun isSatisfiedBy(target: Order): Boolean {
        val isSatisfied = target.items.any { it.product.type == ProductType.MEMBERSHIP }

        if (isSatisfied) {
            shippingStep = MembershipShippingStep(target)
        }

        return isSatisfied
    }
}