package main.kotlin.core.domain.shipping

import main.kotlin.core.domain.product.Book
import main.kotlin.core.domain.product.Product

class BookShipping : ShippingStrategy{
    override fun ship(product: Product) = with(product as Book) {
        product.copy(shippingLabel = "Tax-exempt item as provided in the Constitution Art. 150, VI, d")
    }
}