package challenge

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

public class BootstrapTest {

    val products: List<Product> = emptyList()

	@Test
	fun createProducts() {
        
		products.add(Product("Flowered t-shirt", ProductType.PHYSICAL, 35.00))
		products.add(Product("Familiar plan", ProductType.MEMBERSHIP, 29.90))
		products.add(Product("The Hitchhiker's Guide to the Galaxy", ProductType.BOOK, 120.00))
		products.add(Product("Stairway to Heaven", ProductType.DIGITAL, 5.00))
		
		val floweredTShirt = products.any { it.name === "Flowered t-shirt" }
		assertTrue(floweredTShirt)
    }
	
	@Test
	fun createOrder() {
		
		val addressCustomer = Address("Brasil", "51020-210", "Pernambuco", "Recife", "Rua Padre Bernadino Pessoa", "277", "Apartamento 2202")
		val customerOrder = Customer("Gabriel D'Emery", addressCustomer, "falecomigo@gabrieldemery.com")

		val addressOrder = addressCustomer

    	val order = Order(customerOrder, addressOrder)
        
        products.forEach { order.addProduct(it, (1..5).random()) }
		assertEquals(order.items.size, 4)
	
	    order.pay(CreditCard("43567890987654367"))
		assertEquals(order.totalDiscount, 10)
		assertTrue(order.isPaid())
	}

}