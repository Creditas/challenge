package com.creditas.challenge.model

import java.math.BigDecimal

class ShoppingCart {

    val items = HashMap<Product, Item>()

    fun add(product: Product, quantity: Int): ShoppingCart {
        TODO("implement add")
    }

    fun updateQuantity(product: Product, quantity: Int): ShoppingCart {
        TODO("implement update")
    }

    fun delete(product: Product): ShoppingCart {
        TODO("implement delete")
    }

    fun subtotal(): BigDecimal {
        TODO("implement subtotal")
    }

    fun checkout(): Order {
        TODO("implement checkout")
    }

}