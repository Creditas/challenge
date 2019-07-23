package com.creditas.service.fulfillment.factory

import com.creditas.model.ProductType
import com.creditas.model.ProductType.PHYSICAL
import com.creditas.model.ProductType.BOOK
import com.creditas.model.ProductType.DIGITAL
import com.creditas.model.ProductType.MEMBERSHIP
import com.creditas.service.fulfillment.BookFulfillmentStrategy
import com.creditas.service.fulfillment.DigitalFulfillmentStrategy
import com.creditas.service.fulfillment.MembershipFulfillmentStrategy
import com.creditas.service.fulfillment.PhysicalFulfillmentStrategy

class FulfillmentStrategyFactory {

    fun createFromProductType(productType: ProductType) =
            when (productType) {
                PHYSICAL -> PhysicalFulfillmentStrategy()
                BOOK -> BookFulfillmentStrategy()
                DIGITAL -> DigitalFulfillmentStrategy()
                MEMBERSHIP -> MembershipFulfillmentStrategy()
            }
}