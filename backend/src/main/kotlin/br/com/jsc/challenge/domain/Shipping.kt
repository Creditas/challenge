package br.com.jsc.challenge.domain

import br.com.jsc.challenge.domain.specifications.ShippingPipelineFactory
import br.com.jsc.challenge.domain.specifications.ShippingStepSpec
import br.com.jsc.challenge.services.EmailService
import br.com.jsc.challenge.services.EmailTemplate
import br.com.jsc.challenge.services.SpecificationService

class Shipping(val order: Order) {
    private val specificationService = SpecificationService()

    fun process() {
        val specs = this.specificationService.getAllSatisfiedBy(
            order,
            ShippingPipelineFactory.getSpecs()
        )
        specs.forEach { (it as? ShippingStepSpec)?.shippingStep?.process() }
    }
}

abstract class ShippingStep(val order: Order) {
    abstract fun process()
}

class LabelShippingStep(order: Order) : ShippingStep(order) {
    override fun process() {
        val shippingLabel = ShippingLabel(order)
        shippingLabel.print()
    }
}

class MembershipShippingStep(order: Order) : ShippingStep(order) {
    override fun process() {
        val membership = Membership(order.customer)
        membership.activate()
    }
}

class EmailShippingStep(order: Order, private val emailTemplate: EmailTemplate) : ShippingStep(order) {
    private val emailService = EmailService()

    override fun process() {
        emailService.send(emailTemplate)
    }
}

class VoucherShippingStep(order: Order, private val voucherValue: Double) : ShippingStep(order) {
    override fun process() {
        order.payment?.let { order.customer.addVoucher(Voucher(voucherValue, it)) }
    }
}

class ShippingLabel(val order: Order) {
    fun print() {}
}