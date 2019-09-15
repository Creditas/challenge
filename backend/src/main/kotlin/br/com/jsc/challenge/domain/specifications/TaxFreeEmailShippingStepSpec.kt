package br.com.jsc.challenge.domain.specifications

import br.com.jsc.challenge.domain.EmailShippingStep
import br.com.jsc.challenge.domain.Order
import br.com.jsc.challenge.domain.ProductType
import br.com.jsc.challenge.domain.ShippingStep
import br.com.jsc.challenge.services.EmailTemplate

class TaxFreeEmailShippingStepSpec : ShippingStepSpec() {
    override var shippingStep: ShippingStep? = null

    override fun isSatisfiedBy(target: Order): Boolean {
        val isSatisfied = target.items.any { it.product.type == ProductType.BOOK }

        if (isSatisfied) {
            shippingStep = EmailShippingStep(target, EmailTemplate.TAX_FREE)
        }

        return isSatisfied
    }
}