package main.kotlin.core.domain.shipping

import main.kotlin.core.domain.product.Book
import main.kotlin.core.domain.product.Product

class BookShipping : ShippingStrategy{
    override fun shipping(product: Product) = with(product as Book) {
        this.copy(shippingLabel = ShippingLabel("Tax-exempt item as provided in the Constitution Art. 150, VI, d"))
    }
}