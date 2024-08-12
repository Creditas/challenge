package model

data class OrderItem(val product: Product, val quantity: Int) {
    val total: Double get() = product.price * quantity
}
