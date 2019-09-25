package com.creditas.challenge.model

data class Item(val product: Product, val quantity: Int) {

    val subtotal = product.price.multiply(quantity.toBigDecimal())

}
