package challenge

import challenge.entity.Order
import challenge.enum.ProductType
import challenge.model.OrderItem
import challenge.service.DiscountService
import challenge.service.EmailService
import challenge.service.PrinterService
import challenge.service.SubscriptionService

sealed class OrderItemRules {
    abstract fun process(order: Order, orderItem: OrderItem)

    internal class ProductPhysicalRule(
        private val printerService: PrinterService
    ) : OrderItemRules() {
        override fun process(order: Order, orderItem: OrderItem) {
            println("- Processing ProductPhysicalRule")
            printerService.printLabel(order, orderItem)
        }
    }

    internal class ProductBookRule(
        private val printerService: PrinterService
    ) : OrderItemRules() {
        override fun process(order: Order, orderItem: OrderItem) {
            println("- Processing ProductBookRule")
            printerService.printTaxExceptionLabel(order, orderItem)
        }
    }

    internal class ProductDigitalRule(
        private val emailService: EmailService,
        private val discountService: DiscountService
    ) : OrderItemRules() {
        override fun process(order: Order, orderItem: OrderItem) {
            println("- Processing ProductDigitalRule")
            emailService.sendPurchaseDescription(order, orderItem)

            discountService
                .grantDiscount(order, 10)
                .let { emailService.sendDiscountVoucher(it) }
        }
    }

    internal class ProductMembershipRule(
        private val emailService: EmailService,
        private val subscriptionService: SubscriptionService
    ) : OrderItemRules() {
        override fun process(order: Order, orderItem: OrderItem) {
            println("- Processing ProductMembershipRule")

            subscriptionService
                .subscribe(order, orderItem)
                .let { emailService.sendSubscription(it) }
        }
    }
}

class OrderRulesFactory {
    fun getInstance(orderItem: OrderItem): OrderItemRules = when (orderItem.product.type) {
        ProductType.PHYSICAL -> OrderItemRules.ProductPhysicalRule(PrinterService.instance)
        ProductType.BOOK -> OrderItemRules.ProductBookRule(PrinterService.instance)
        ProductType.DIGITAL -> OrderItemRules.ProductDigitalRule(EmailService.instance, DiscountService.instance)
        ProductType.MEMBERSHIP -> OrderItemRules.ProductMembershipRule(EmailService.instance, SubscriptionService.instance)
    }
}
