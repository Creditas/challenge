import challenge.Address
import challenge.Customer
import challenge.ProductType
import challenge.ShippingRules
import org.junit.Assert.assertEquals
import org.junit.Test

class BootstrapKtTest {

    @Test
    fun test_shipping_for_book() {
        var address = Address(zipCode = "00000-000")
        var customer = Customer(email = "foolano@gmail.com")

        var shippingRules = ShippingRules()
        var result = shippingRules.shippings[ProductType.BOOK]?.submit(customer, address)


        assertEquals("It book", result)
    }

    @Test
    fun test_shipping_for_physical_item() {
        var address = Address(zipCode = "00000-000")
        var customer = Customer(email = "foolano@gmail.com")

        var shippingRules = ShippingRules()
        var result = shippingRules.shippings[ProductType.PHYSICAL]?.submit(customer, address)


        assertEquals("It services subscription", result)
    }

    @Test
    fun test_shipping_for_service_subscription() {
        var address = Address(zipCode = "00000-000")
        var customer = Customer(email = "foolano@gmail.com")

        var shippingRules = ShippingRules()
        var result = shippingRules.shippings[ProductType.MEMBERSHIP]?.submit(customer, address)


        assertEquals("It services subscription", result)
    }

   @Test
   fun test_shipping_for_digital_media() {
       var address = Address(zipCode = "00000-000")
       var customer = Customer(email = "foolano@gmail.com")

       var shippingRules = ShippingRules()
       var result = shippingRules.shippings[ProductType.DIGITAL]?.submit(customer, address)


       assertEquals("It digital media", result)
   }

}