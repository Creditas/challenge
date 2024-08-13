package challenge.services.factory

import challenge.domain.entities.Payment
import challenge.domain.entities.ProductType
import challenge.domain.interfaces.PaymentProcessor
import challenge.services.strategy.BookStrategy
import challenge.services.strategy.DigitalItemStrategy
import challenge.services.strategy.MembershipStrategy
import challenge.services.strategy.PhysicalItemStrategy

object PaymentProcessorFactory {
    fun createProcessor(payment: Payment): PaymentProcessor {
        return when (payment.order.payment?.invoice?.order?.items?.firstOrNull()?.product?.type) {
            ProductType.PHYSICAL -> PhysicalItemStrategy(payment)
            ProductType.MEMBERSHIP -> MembershipStrategy(payment)
            ProductType.BOOK -> BookStrategy(payment)
            ProductType.DIGITAL -> DigitalItemStrategy(payment)
            null -> throw IllegalArgumentException("Invalid product type")
        }
    }
}
