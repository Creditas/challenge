package com.creditas.service.fulfillment

import com.creditas.model.Order
import com.creditas.model.ProductType
import com.creditas.service.EmailService
import com.creditas.service.ShippingLabelService
import com.creditas.service.VoucherService

interface FulfillmentStrategy {

    fun fulfill(order: Order)

    companion object {
        fun newInstance(productType: ProductType) = when (productType) {
                ProductType.PHYSICAL -> PhysicalFulfillmentStrategy(ShippingLabelService())
                ProductType.BOOK -> BookFulfillmentStrategy(ShippingLabelService())
                ProductType.DIGITAL -> DigitalFulfillmentStrategy(EmailService(), VoucherService())
                ProductType.MEMBERSHIP -> MembershipFulfillmentStrategy(EmailService())
        }
    }
}
