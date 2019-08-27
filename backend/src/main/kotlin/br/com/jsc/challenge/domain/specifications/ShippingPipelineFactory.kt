package br.com.jsc.challenge.domain.specifications

import br.com.jsc.challenge.domain.Order

class ShippingPipelineFactory {
    companion object Factory {
        fun getSpecs(): List<Specification<Order>> {
            return listOf(
                LabelShippingStepSpec(),
                MembershipShippingStepSpec(),
                MembershipEmailShippingStepSpec(),
                TaxFreeEmailShippingStepSpec(),
                DescriptionEmailShippingStepSpec(),
                VoucherShippingStepSpec()
            )
        }
    }
}