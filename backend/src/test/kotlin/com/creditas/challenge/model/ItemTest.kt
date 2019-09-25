package com.creditas.challenge.model

import org.assertj.core.api.Assertions
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

internal class ItemTest {

    @Test
    fun `when quantity is lower than or equalTo 0, throw IllegalArgEx`() {
        assertThrows(IllegalArgumentException::class.java) {
            val product = Product("product", ProductType.PHYSICAL, 1.99)
            Item(product, 0)
        }
    }

    @Test
    fun `when querying for subtotal, compute unit_price x units`() {
        val product = Product("product", ProductType.PHYSICAL, 1.99)
        val item = Item(product, 10)
        Assertions.assertThat(item.subtotal.toPlainString()).isEqualTo("19.90")
    }

}