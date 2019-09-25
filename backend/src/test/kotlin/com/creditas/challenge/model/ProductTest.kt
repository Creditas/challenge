package com.creditas.challenge.model

import org.assertj.core.api.Assertions
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
        Assertions.assertThat(product.price.toPlainString()).isEqualTo("1.97")
    }

}