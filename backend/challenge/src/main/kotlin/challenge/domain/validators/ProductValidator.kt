package challenge.domain.validators

import challenge.domain.entities.OrderItem
import challenge.domain.entities.Product
import challenge.domain.exceptions.ProductAlreadyAddedException

object ProductValidator {
    fun validate(items: List<OrderItem>, product: Product) {
        if (items.any { it.product == product }) {
            throw ProductAlreadyAddedException()
        }
    }
}