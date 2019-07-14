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

    internal object ProductPhysicalRule : OrderItemRules() {
        override fun process(order: Order, orderItem: OrderItem) {
            println("- Processing ProductPhysicalRule")
            PrinterService.instance().printLabel(order, orderItem)
        }
    }

    internal object ProductMembershipRule : OrderItemRules() {
        override fun process(order: Order, orderItem: OrderItem) {
            println("- Processing ProductMembershipRule")

            SubscriptionService.instance()
                .subscribe(order, orderItem)
                .let { EmailService.instance().sendSubscription(it) }
        }
    }

    internal object ProductBookRule : OrderItemRules() {
        override fun process(order: Order, orderItem: OrderItem) {
            println("- Processing ProductBookRule")
            PrinterService.instance().printTaxExceptionLabel(order, orderItem)
        }
    }

    internal object ProductDigitalRule : OrderItemRules() {
        override fun process(order: Order, orderItem: OrderItem) {
            println("- Processing ProductDigitalRule")
            EmailService.instance().sendPurchaseDescription(order, orderItem)

            DiscountService.instance()
                .grantDiscount(order, 10)
                .let { EmailService.instance().sendDiscountVoucher(it) }
        }
    }
}

class OrderRulesFactory {
    fun getInstance(orderItem: OrderItem): OrderItemRules = when (orderItem.product.type) {
        ProductType.PHYSICAL -> OrderItemRules.ProductPhysicalRule
        ProductType.BOOK -> OrderItemRules.ProductBookRule
        ProductType.DIGITAL -> OrderItemRules.ProductDigitalRule
        ProductType.MEMBERSHIP -> OrderItemRules.ProductMembershipRule
    }
}
