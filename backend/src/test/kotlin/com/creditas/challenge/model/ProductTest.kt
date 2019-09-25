package com.creditas.challenge.model

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test

internal class ProductTest {

    @Test
    fun `when name is blank, throw IllegalArgEx`() {
        assertThrows(IllegalArgumentException::class.java) {
            Product(" ", ProductType.PHYSICAL, 1.99)
        }
    }

    @Test
    fun `when price is lower than or equalTo 0, throw IllegalArgEx`() {
        assertThrows(IllegalArgumentException::class.java) {
            Product("product", ProductType.PHYSICAL, 0.0)
        }
    }

    @Test
    fun `when price has more than 2 digits, round up`() {
        val product = Product("product", ProductType.PHYSICAL, 1.965)
        assertThat(product.price.toPlainString()).isEqualTo("1.97")
    }

    @Test
    fun `when two products have the same name and type, they should be equal`() {
        val productA = Product("product", ProductType.PHYSICAL, 19.99)
        val productB = Product("product", ProductType.PHYSICAL, 15.90)
        assertThat(productA).isEqualTo(productB)
    }

}