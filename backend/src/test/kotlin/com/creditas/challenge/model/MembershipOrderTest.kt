package com.creditas.challenge.model

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import java.time.YearMonth

internal class MembershipOrderTest {

    private lateinit var account: Account
    private lateinit var paymentMethod: PaymentMethod
    private lateinit var subscriptions: List<Item>


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

        val netflix = Product("Netflix Familiar Plan", ProductType.SUBSCRIPTION, 29.90)
        val spotify = Product("Spotify Premium", ProductType.SUBSCRIPTION, 14.90)
        val amazon = Product("Amazon Prime", ProductType.SUBSCRIPTION, 12.90)

        subscriptions = listOf(
            Item(netflix, 1),
            Item(spotify, 1),
            Item(amazon, 1)
        )
    }

    @Test
    fun `when creating a Membership Order, there must be only a Membership item the list`() {
        val ex = assertThrows(IllegalArgumentException::class.java) {
            val product = Product("physical product", ProductType.PHYSICAL, 1.99)
            MembershipOrder(listOf(Item(product, 1)), account)
        }
        assertThat(ex.message).isEqualTo("A Membership Order may only contain Membership items")
    }

    @Test
    fun `when placing a MembershipOrder, a paymentMethod must be informed`() {
        val ex = assertThrows(IllegalArgumentException::class.java) {
            MembershipOrder(subscriptions[0], account).place()
        }
        assertThat(ex.message).isEqualTo("A Payment method must be informed to place the Order")
    }

    @Test
    fun `when placing a MembershipOrder, there must be exactly one item in the list`() {
        val ex = assertThrows(IllegalArgumentException::class.java) {
            MembershipOrder(subscriptions, account)
                .selectPaymentMethod(paymentMethod)
                .place()
        }
        assertThat(ex.message).isEqualTo("A Membership Order may only contain one Membership subscription")
    }

    @Test
    fun `when placing a Membership Order, subtotal should be equalTo the Item price`() {
        val membershipOrder = MembershipOrder(subscriptions[0], account)
            .selectPaymentMethod(paymentMethod)
            .place()

        assertThat(membershipOrder.subtotal().toPlainString()).isEqualTo("29.90")
    }

    @Test
    fun `when placing a Membership Order, total should be equalTo the Subtotal`() {
        val membershipOrder = MembershipOrder(subscriptions[0], account)
            .selectPaymentMethod(paymentMethod)
            .place()

        assertThat(membershipOrder.grandTotal().toPlainString()).isEqualTo("29.90")
    }

    @Test
    fun `when paying for Membership Order, throw IllegalStateEx if Status is not PENDING`() {
        val membershipOrder = MembershipOrder(subscriptions[0], account)
            .selectPaymentMethod(paymentMethod)

        val ex = assertThrows(IllegalStateException::class.java) {
            membershipOrder.pay()
        }

        assertThat(ex.message).isEqualTo("Order must be placed before it can be payed")
    }

    @Test
    fun `when paying for Membership Order, Status should be updated to PENDING_ACTIVATION once pay is successful`() {
        val membershipOrder = MembershipOrder(subscriptions[0], account)
            .selectPaymentMethod(paymentMethod)
            .place()
            .pay()

        assertThat(membershipOrder.status).isEqualTo(OrderStatus.PENDING_ACTIVATION)
    }

    @Test
    fun `when paying for Membership Order that was already payed, throw IllegalArgEx`() {
        val membershipOrder = MembershipOrder(subscriptions[0], account)
            .selectPaymentMethod(paymentMethod)
            .place()
            .pay()

        val ex = assertThrows(IllegalStateException::class.java) {
            membershipOrder.pay()
        }

        assertThat(ex.message).isEqualTo("Order Payment has been processed already")
    }

    @Test
    fun `when fulfilling a Membership Order, throw IllegalStateEx if Status is not PAYMENT_COMPLETE`() {
        val membershipOrder = MembershipOrder(subscriptions[0], account)
            .selectPaymentMethod(paymentMethod)
            .place()

        val ex = assertThrows(IllegalStateException::class.java) {
            membershipOrder.fulfill()
        }

        assertThat(ex.message).isEqualTo("Order must be placed and payed before it can be fulfilled")
    }

    @Test
    fun `when fulfilling a Membership Order, Status should be updated to ACTIVATED`() {
        val membershipOrder = MembershipOrder(subscriptions[0], account)
            .selectPaymentMethod(paymentMethod)
            .place()
            .pay()
            .fulfill()

        assertThat(membershipOrder.status).isEqualTo(OrderStatus.ACTIVATED)
    }


}