package br.com.jsc.challenge.domain.specifications

import br.com.jsc.challenge.domain.Order
import br.com.jsc.challenge.domain.ShippingStep

abstract class ShippingStepSpec : Specification<Order>() {
    abstract var shippingStep: ShippingStep?
}