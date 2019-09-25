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
        val billingAddress = Address.Builder()
            .country("Brazil")
            .city("Sao Paulo")
            .state("SP")
            .postalCode("01000-000")
            .streetAddress("Av Paulista, 1000")
            .build()

        paymentMethod = CreditCard(
            "JOHN DOE",
            "123.456.789-00", 123,
            YearMonth.of(2027, 11),
            billingAddress
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

    @Test
    fun `when paying for a Digital Order, throw IllegalStateEx if Status is not PENDING`() {
        val digitalOrder = DigitalOrder(digitalItems, account)
            .selectPaymentMethod(paymentMethod)

        val ex = assertThrows(IllegalStateException::class.java) {
            digitalOrder.pay()
        }
        assertThat(ex.message).isEqualTo("Order must be placed before it can be payed")
    }

    @Test
    fun `when paying for a Digital Order, Status should be updated to UNSENT once pay is successful`() {
        val digitalOrder = DigitalOrder(digitalItems, account)
            .selectPaymentMethod(paymentMethod)
            .place()
            .pay()
        assertThat(digitalOrder.status).isEqualTo(OrderStatus.UNSENT)
    }

    @Test
    fun `when paying for a Digital Order that was already payed, throw IllegalArgEx`() {
        val digitalOrder = DigitalOrder(digitalItems, account)
            .selectPaymentMethod(paymentMethod)
            .place()
            .pay()

        val ex = assertThrows(IllegalStateException::class.java) {
            digitalOrder.pay()
        }
        assertThat(ex.message).isEqualTo("Order Payment has been processed already")
    }

    @Test
    fun `when fulfilling a Digital Order, throw IllegalStateEx if Status is not PAYMENT_COMPLETE`() {
        val digitalOrder = DigitalOrder(digitalItems, account)
            .selectPaymentMethod(paymentMethod)
            .place()

        val ex = assertThrows(IllegalStateException::class.java) {
            digitalOrder.fulfill()
        }
        assertThat(ex.message).isEqualTo("Order must be placed and payed before it can be fulfilled")
    }

    @Test
    fun `when fulfilling a Digital Order, Status should be updated to SENT`() {
        val digitalOrder = DigitalOrder(digitalItems, account)
            .selectPaymentMethod(paymentMethod)
            .place()
            .pay()
            .fulfill()
        assertThat(digitalOrder.status).isEqualTo(OrderStatus.SENT)
    }

    @Test
    fun `when completing a Digital Order, throw IllegalStateEx if Status is not UNSENT`() {
        val digitalOrder = DigitalOrder(digitalItems, account)
            .selectPaymentMethod(paymentMethod)
            .place()
            .pay()

        val ex = assertThrows(IllegalStateException::class.java) {
            digitalOrder.complete()
        }
        assertThat(ex.message).isEqualTo("Order must have been shipped/sent and confirmed, before it can be completed")
    }

    @Test
    fun `when completing a Digital Order, Status should be updated to REDEEMED`() {
        val digitalOrder = DigitalOrder(digitalItems, account)
            .selectPaymentMethod(paymentMethod)
            .place()
            .pay()
            .fulfill()
            .complete()
        assertThat(digitalOrder.status).isEqualTo(OrderStatus.REDEEMED)
    }

}