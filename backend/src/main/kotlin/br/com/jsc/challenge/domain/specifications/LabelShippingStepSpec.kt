package br.com.jsc.challenge.domain.specifications

import br.com.jsc.challenge.domain.LabelShippingStep
import br.com.jsc.challenge.domain.Order
import br.com.jsc.challenge.domain.ProductType
import br.com.jsc.challenge.domain.ShippingStep

class LabelShippingStepSpec : ShippingStepSpec() {
    override var shippingStep: ShippingStep? = null

    override fun isSatisfiedBy(target: Order): Boolean {
        val isSatisfied = target.items.any {
            it.product.type == ProductType.PHYSICAL || it.product.type == ProductType.BOOK
        }

        if (isSatisfied) {
            shippingStep = LabelShippingStep(target)
        }

        return isSatisfied
    }
}