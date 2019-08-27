package com.creditas.backend.shipping.strategy

import com.creditas.backend.domain.Order
import com.creditas.backend.domain.ProductType
import com.creditas.backend.shipping.service.impl.ActivateMembership
import com.creditas.backend.shipping.service.impl.GrantVoucher
import com.creditas.backend.shipping.service.impl.SendEmail
import com.creditas.backend.shipping.service.impl.ShippingLabel
import com.creditas.backend.shipping.strategy.impl.BookShipping
import com.creditas.backend.shipping.strategy.impl.DigitalShipping
import com.creditas.backend.shipping.strategy.impl.PhysicalShipping
import com.creditas.backend.shipping.strategy.impl.SubscriptionShipping

interface Shipping {

    fun ship(order: Order)

    companion object {
        fun new(productType: ProductType): Shipping =
                when (productType) {
                    ProductType.BOOK -> BookShipping(ShippingLabel())
                    ProductType.DIGITAL -> DigitalShipping(SendEmail(), GrantVoucher())
                    ProductType.PHYSICAL -> PhysicalShipping(ShippingLabel())
                    ProductType.MEMBERSHIP -> SubscriptionShipping(ActivateMembership(), SendEmail())
                }
    }

}