package main.kotlin.core.domain.product

import main.kotlin.core.domain.shipping.ShippingStrategy

abstract class Product(open val name: String, open val price: Double){
    abstract fun ship() : ShippingStrategy
}