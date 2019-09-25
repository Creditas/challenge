package com.creditas.challenge.model

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

internal class ItemTest {

    @Test
    fun `when quantity is lower than or equalTo 0, throw IllegalArgEx`() {
        val ex = assertThrows(IllegalArgumentException::class.java) {
            val product = Product("product", ProductType.PHYSICAL, 1.99)
            Item(product, 0)
        }
    }

    @Test
    fun `when addMore is called, if qtty is greaterThanZero, it should increment the quantity`() {
        val product = Product("product", ProductType.PHYSICAL, 1.99)
        val item = Item(product, 10)
        item.addMore(1)
        assertThat(item.quantity).isEqualTo(11)
    }

    @Test
    fun `when addMore is called, if qtty is lowerThanOrEqualToZero, it should throw IllegalArgEx`() {
        val product = Product("product", ProductType.PHYSICAL, 1.99)
        val item = Item(product, 10)
        val ex = assertThrows(IllegalArgumentException::class.java) {
            item.addMore(-1)
        }
        assertThat(ex.message).isEqualTo("Quantity must be greaterThan 0")
    }


    @Test
    fun `when updateTo is called, if qtty is greaterOrEqualToZero, it should overwrite the quantity`() {
        val product = Product("product", ProductType.PHYSICAL, 1.99)
        val item = Item(product, 10)
        item.updateTo(1)
        assertThat(item.quantity).isEqualTo(1)
    }

    @Test
    fun `when updateTo is called, if qtty is lowerThanZero, it should throw IllegalArgEx`() {
        val product = Product("product", ProductType.PHYSICAL, 1.99)
        val item = Item(product, 10)
        val ex = assertThrows(IllegalArgumentException::class.java) {
            item.updateTo(-1)
        }
        assertThat(ex.message).isEqualTo("Quantity must be equalTo or greaterThan 0")
    }

    @Test
    fun `when querying for subtotal, compute unit_price x units`() {
        val product = Product("product", ProductType.PHYSICAL, 1.99)
        val item = Item(product, 10)
        assertThat(item.subtotal.toPlainString()).isEqualTo("19.90")
    }

}