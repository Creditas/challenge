package challenge

import java.lang.Exception
import java.util.*

class Order(
    val customer: Customer,
    val address: Address
) {
    private val items = mutableListOf<OrderItem>()
    var closedAt: Date? = null
        private set
    private var totalDiscount = 0.00
    var payment: Payment? = null
        private set
    val totalAmount
        get() = items.sumByDouble { it.total } - totalDiscount

    fun addProduct(product: Product, quantity: Int) {
        var productAlreadyAdded = items.any { it.product == product }
        if (productAlreadyAdded)
            throw Exception("The product have already been added. Change the amount if you want more.")

        items.add(OrderItem(product, quantity))
    }

    fun pay(method: PaymentMethod) {
        if (payment != null)
            throw Exception("The order has already been paid!")

        if (items.count() == 0)
            throw Exception("Empty order can not be paid!")

        checkDigitalProduct()

        payment = Payment(this, method)

        close()

        if(isPaid())
            confirmedPayment(customer, items)
    }
	
	private fun checkDigitalProduct() {
		var containsDigitalProduct = items.any { it.product.type === ProductType.DIGITAL }
		if (containsDigitalProduct)
			totalDiscount = 10.00
	}

    private fun close() {
        closedAt = Date()
    }

    fun isPaid(): Boolean {
        var response = false
        if(closedAt != null) {
            response = true
        }
        return response
    }
	
	private fun confirmedPayment(customer: Customer, list: List<OrderItem>) {
		var listPhysicalOrBook = list.filter { it.product.type === ProductType.PHYSICAL || it.product.type === ProductType.BOOK }
		if (listPhysicalOrBook.isNotEmpty()) Label.printLabel(customer, listPhysicalOrBook)
		
	    var listDigital = list.filter { it.product.type === ProductType.DIGITAL }
		if (listDigital.isNotEmpty()) Email.sendNotify(customer, listDigital)
		
	    var listMembership = list.filter { it.product.type === ProductType.MEMBERSHIP }
		if (listMembership.isNotEmpty()) Email.sendSignature(customer, listMembership)
	}
}

data class OrderItem(
    val product: Product,
    val quantity: Int
) {
    val total get() = product.price * quantity
}

data class Payment(
    val order: Order,
    val paymentMethod: PaymentMethod
) {
    val paidAt = Date()
    val authorizationNumber = paidAt.time
    val amount = order.totalAmount
    val invoice = Invoice(order)
}

data class CreditCard(
    val number: String
) : PaymentMethod() {
    override fun validatedPaymentMethod(): Boolean {
		return number.length > 13 && number.length < 17
	}
}

abstract class PaymentMethod {
    abstract fun validatedPaymentMethod(): Boolean
}

data class Invoice(val order: Order) {
    val billingAddress: Address
        get() = order.customer.address
    val shippingAddress: Address
        get() = order.address
}

data class Product(
    val name: String,
    val type: ProductType,
    val price: Double
)

enum class ProductType {
    PHYSICAL,
    BOOK,
    DIGITAL,
    MEMBERSHIP
}

class Address (
    var country: String,
    var zip: String,
    var state: String,
    var city: String,
    var address: String,
    var number: String,
    var complement: String
) {
    val fullAddress
        get() = "$address, $number $complement, $zip - $city, $state, $country"
}

class Customer(
    var fullName: String,
    var address: Address,
    var email: String
)

class Email() {
    companion object {
		fun sendSignature(customer: Customer, products: List<OrderItem>) {
			// Send for topic to Kafka consumer
            println(" ========== START OF SUBMISSION SUBSCRIPTION ACTIVATION")
            println("To: " + customer.fullName + " <" + customer.email + ">")
            println("Subject: Subscription Activation")
            println("Message:")
            products.forEach { println(it.product.name + " signature activation!") }
            println(" ========== END OF SUBMISSION SUBSCRIPTION ACTIVATION")
		}
		fun sendNotify(customer: Customer, products: List<OrderItem>) {
            // Send for topic to Kafka consumer
            println(" ========== START OF PURCHASE NOTIFICATION")
            println("To: " + customer.fullName + " <" + customer.email + ">")
            println("Subject: Purchase Notification")
            println("Message:")
            products.forEach { println(it.product.name + " purchase notification!") }
            println(" ========== END OF PURCHASE NOTIFICATION")
		}
    }
}

class Label() {
    companion object {
        fun printLabel(customer: Customer, products: List<OrderItem>) {
            // Print Label with data of Customer and list of Products, if exists Products of type Book print "Tax-free"
            println(" ========== LABEL PRINTING BEGINS")
            println("Name: " + customer.fullName)
            println("Address: " + customer.address.fullAddress)
            println("Products:")
            products.forEach {
                var line = it.quantity.toString() + "x " + it.product.name + " = " + it.total
                if (it.product.type === ProductType.BOOK)
                    line = line + " (Tax-free)"
                println(line)
            }
            println(" ========== LABEL PRINTING TERMINATION")
        }

    }
}

fun main(args : Array<String>) {
    println(" ========== START APPLICATION")

    // Products
    val shirt = Product("Flowered t-shirt", ProductType.PHYSICAL, 35.00)
    val netflix = Product("Familiar plan", ProductType.MEMBERSHIP, 29.90)
    val book = Product("The Hitchhiker's Guide to the Galaxy", ProductType.BOOK, 120.00)
    val music = Product("Stairway to Heaven", ProductType.DIGITAL, 5.00)

    val addressCustomer = Address("Brasil", "51020-210", "Pernambuco", "Recife", "Rua Padre Bernadino Pessoa", "277", "Apartamento 2202")
    val customerOrder = Customer("Gabriel D'Emery", addressCustomer, "falecomigo@gabrieldemery.com")

    val addressOrder = addressCustomer

    val order = Order(customerOrder, addressOrder)

    order.addProduct(shirt, 2)
    order.addProduct(netflix, 1)
    order.addProduct(book, 1)
    order.addProduct(music, 1)

    order.pay(CreditCard("43567890-987654367"))

    println(" ========== END APPLICATION")
}