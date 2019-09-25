package com.creditas.challenge.model

import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import java.time.YearMonth

internal class PhysicalOrderTest {

    private lateinit var account: Account
    private lateinit var shippingAddress: Address
    private lateinit var paymentMethod: PaymentMethod
    private lateinit var physicalItems: List<Item>
    private lateinit var physicalTaxFreeItems: List<Item>


    @BeforeEach
    fun setup() {
        shippingAddress = Address.Builder()
            .country("Brazil")
            .city("Sao Paulo")
            .state("SP")
            .postalCode("01000-000")
            .streetAddress("Av Paulista, 1000")
            .build()

        paymentMethod = CreditCard(
            "JOHN DOE",
            "123.456.789-00", 123,
            YearMonth.of(2027, 11)
        )

        account = Account("Bruno", "email@domain.suffix", "password")

        val console = Product("PS4 Slim 1TB", ProductType.PHYSICAL, 1899.00)
        val chair = Product("PDP Chair", ProductType.PHYSICAL, 399.00)
        val book = Product("Cracking the Code Interview", ProductType.PHYSICAL_TAX_FREE, 219.57)
        val anotherBook = Product("The Hitchhiker's Guide to the Galaxy", ProductType.PHYSICAL_TAX_FREE, 120.00)

        physicalItems = listOf(
            Item(console, 1),
            Item(chair, 2)
        )
        physicalTaxFreeItems = listOf(
            Item(book, 2),
            Item(anotherBook, 1)
        )
    }


    @Test
    fun `when creating a Physical Order, there must be only Physical items in the list`() {
        val ex = assertThrows(IllegalArgumentException::class.java) {
            val product = Product("digital product", ProductType.DIGITAL, 1.99)
            PhysicalOrder(listOf(Item(product, 1)), account)
        }
        assertThat(ex.message).isEqualTo("A Physical Order may only contain Physical items")
    }

    @Test
    fun `when placing a PhysicalOrder, there must be at least one item in the list`() {
        val ex = assertThrows(IllegalArgumentException::class.java) {
            val physicalOrder = PhysicalOrder(listOf(), account)
            physicalOrder.place()
        }
        assertThat(ex.message).isEqualTo("There must be at least one item to place the Order")
    }

    @Test
    fun `when placing a Physical Order, a shippingAddress must be informed`() {
        val ex = assertThrows(IllegalArgumentException::class.java) {
            val physicalOrder = PhysicalOrder(physicalItems, account)
                .selectPaymentMethod(paymentMethod)
            physicalOrder.place()
        }
        assertThat(ex.message).isEqualTo("Shipping Address must be informed for Orders with physical delivery")
    }

    @Test
    fun `when placing a PhysicalOrder, a paymentMethod must be informed`() {
        val ex = assertThrows(IllegalArgumentException::class.java) {
            val physicalOrder = PhysicalOrder(physicalItems, account)
            physicalOrder.selectShippingAddress(shippingAddress)
            physicalOrder.place()
        }
        assertThat(ex.message).isEqualTo("A Payment method must be informed to place the Order")
    }


    @Test
    fun `when placing a Physical Order with Physical and Physical_Books, there should be different parcels`() {
        val physicalItems = listOf(physicalItems, physicalTaxFreeItems).flatten()
        val physicalOrder = PhysicalOrder(physicalItems, account)
            .selectShippingAddress(shippingAddress)
            .selectPaymentMethod(paymentMethod)
            .place()

        val parcels = physicalOrder.parcels()
        assertThat(parcels.size).isEqualTo(2)
    }

    @Test
    fun `when placing a Physical Order with physical_books, its package must contain notes informing it's free of taxes`() {
        val physicalItems = listOf(physicalItems, physicalTaxFreeItems).flatten()
        val physicalOrder = PhysicalOrder(physicalItems, account)
            .selectShippingAddress(shippingAddress)
            .selectPaymentMethod(paymentMethod)
            .place()

        val parcel = physicalOrder.parcels()
            .asSequence()
            .find { it.shippingLabel == ShippingLabel.TAX_FREE }

        assertThat(parcel!!.shippingLabel.desc)
            .isEqualTo("Isento de impostos conforme disposto na Constituição Art. 150, VI, d.")
    }

    @Test
    fun `when placing a Physical Order, subtotal should compute overall sum of all Item prices`() {
        val physicalItems = listOf(physicalItems, physicalTaxFreeItems).flatten()
        val physicalOrder = PhysicalOrder(physicalItems, account)
            .selectShippingAddress(shippingAddress)
            .selectPaymentMethod(paymentMethod)
            .place()

        assertThat(physicalOrder.subtotal().toPlainString()).isEqualTo("3256.14")
    }

    @Test
    fun `when placing a Physical Order, total should compute subtotal plus shippingCosts`() {
        val physicalItems = listOf(physicalItems, physicalTaxFreeItems).flatten()
        val physicalOrder = PhysicalOrder(physicalItems, account)
            .selectShippingAddress(shippingAddress)
            .selectPaymentMethod(paymentMethod)
            .place()

        assertThat(physicalOrder.grandTotal().toPlainString()).isEqualTo("3276.14")
    }

}
