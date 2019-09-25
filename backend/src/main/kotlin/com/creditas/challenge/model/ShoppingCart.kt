package com.creditas.challenge.model

import java.lang.IllegalArgumentException
import java.lang.IllegalStateException
import java.math.BigDecimal
import java.math.RoundingMode
import java.util.function.BiFunction

class ShoppingCart {

    val items = HashMap<Product, Item>()

    fun add(product: Product, quantity: Int) = apply {
        items.compute(product, BiFunction { _, item ->
            item?.addMore(quantity) ?:
            Item(product, quantity)
        })
    }

    fun updateQuantity(product: Product, quantity: Int) = apply {
        if (quantity == 0) {
            delete(product)
        } else {
            items.compute(product, BiFunction { _, item ->
                item?.updateTo(quantity) ?:
                throw IllegalArgumentException("Product specified is not in the Cart")
            })
        }
    }

    fun delete(product: Product) = apply {
        if (items.containsKey(product)) {
            items.remove(product)
        } else {
            throw IllegalArgumentException("Product specified is not in the Cart")
        }
    }

    fun subtotal(): BigDecimal {
        return items.values.asSequence()
            .map { item -> item.subtotal }
            .fold(BigDecimal.ZERO) { acc, value ->acc.plus(value) }
            .setScale(2, RoundingMode.HALF_UP)
    }

    fun checkout(account: Account): List<Order> {
        return items.values.asSequence()
            .groupBy { it.product.type.orderType }
            .map { (orderType, items) ->
                when(orderType) {
                    OrderType.PHYSICAL -> listOf(PhysicalOrder(items, account))
                    OrderType.DIGITAL -> listOf(DigitalOrder(items, account))
                    OrderType.MEMBERSHIP -> items.map { item -> MembershipOrder(item, account) }
                }
            }.flatten()
    }

}