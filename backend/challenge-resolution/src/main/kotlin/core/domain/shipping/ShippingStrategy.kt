package main.kotlin.core.domain.shipping

import main.kotlin.core.domain.product.Product

interface ShippingStrategy {
    fun shipping(product: Product) : Product
}