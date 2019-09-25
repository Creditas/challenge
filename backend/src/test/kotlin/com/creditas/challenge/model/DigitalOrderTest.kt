package com.creditas.challenge.model

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import java.time.YearMonth

internal class DigitalOrderTest {

    private lateinit var account: Account
    private lateinit var paymentMethod: PaymentMethod
    private lateinit var digitalItems: List<Item>


    @BeforeEach
    fun setup() {
        paymentMethod = CreditCard(
            "JOHN DOE",
            "123.456.789-00", 123,
            YearMonth.of(2027, 11)
        )

        account = Account("Bruno", "email@domain.suffix", "password")

        val musicDigitalAlbum = Product("Stairway to Heaven", ProductType.DIGITAL, 5.00)
        val videoGameDigitalCopy = Product("Nier:Automata", ProductType.DIGITAL, 129.90)

        digitalItems = listOf(
            Item(musicDigitalAlbum, 1),
            Item(videoGameDigitalCopy, 4)
        )
    }

    @Test
    fun `when creating a Digital Order, there must be only Digital items in the list`() {
        val ex = assertThrows(IllegalArgumentException::class.java) {
            val product = Product("physical product", ProductType.PHYSICAL, 1.99)
            DigitalOrder(listOf(Item(product, 1)), account)
        }
        assertThat(ex.message).isEqualTo("A Digital Order may only contain Digital items")
    }

    @Test
    fun `when placing a DigitalOrder, there must be at least one item in the list`() {
        val ex = assertThrows(IllegalArgumentException::class.java) {
            val digitalOrder = DigitalOrder(listOf(), account)
            digitalOrder.place()
        }
        assertThat(ex.message).isEqualTo("There must be at least one item to place the Order")
    }

    @Test
    fun `when placing a DigitalOrder, a paymentMethod must be informed`() {
        val ex = assertThrows(IllegalArgumentException::class.java) {
            val digitalOrder = DigitalOrder(digitalItems, account)
            digitalOrder.place()
        }
        assertThat(ex.message).isEqualTo("A Payment method must be informed to place the Order")
    }

    @Test
    fun `when placing a Digital Order, subtotal should compute overall sum of all Item prices`() {
        val digitalOrder = DigitalOrder(digitalItems, account)
            .selectPaymentMethod(paymentMethod)
            .place()
        assertThat(digitalOrder.subtotal().toPlainString()).isEqualTo("524.60")
    }

    @Test
    fun `when placing a Digital Order, total should compute subtotal plus discounts for Digital Items`() {
        val digitalOrder = DigitalOrder(digitalItems, account)
            .selectPaymentMethod(paymentMethod)
            .place()
        assertThat(digitalOrder.grandTotal().toPlainString()).isEqualTo("514.60")
    }
}