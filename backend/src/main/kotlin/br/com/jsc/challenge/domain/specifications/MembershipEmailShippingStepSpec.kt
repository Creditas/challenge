package br.com.jsc.challenge.domain.specifications

import br.com.jsc.challenge.domain.EmailShippingStep
import br.com.jsc.challenge.domain.Order
import br.com.jsc.challenge.domain.ProductType
import br.com.jsc.challenge.domain.ShippingStep
import br.com.jsc.challenge.services.EmailTemplate

class MembershipEmailShippingStepSpec : ShippingStepSpec() {
    override var shippingStep: ShippingStep? = null

    override fun isSatisfiedBy(target: Order): Boolean {
        val isSatisfied = target.items.any { it.product.type == ProductType.MEMBERSHIP }

        if (isSatisfied) {
            shippingStep = EmailShippingStep(target, EmailTemplate.MEMBERSHIP_ACTIVATION)
        }

        return isSatisfied
    }
}