package com.creditas.challenge.model

data class Item(val product: Product, val quantity: Int) {

    val subtotal = product.price.multiply(quantity.toBigDecimal())

    init {
        require(quantity > 0) { "Quantity must be > 0" }
    }
}
