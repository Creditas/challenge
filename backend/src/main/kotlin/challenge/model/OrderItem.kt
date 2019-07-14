package challenge.model

import challenge.entity.Product

data class OrderItem(val product: Product, val quantity: Int) {
    val total get() = product.price * quantity
}
