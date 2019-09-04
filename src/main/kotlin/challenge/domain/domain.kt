package challenge.domain

import challenge.application.SignatureService
import java.lang.Exception
import java.util.*

class Order(val customer: Customer, val address: Address) {
    val items = mutableListOf<OrderItem>()
    var closedAt: Date? = null
        private set
    var payment: Payment? = null
        private set
    val totalAmount
        get() = items.sumByDouble { it.total }

    fun addProduct(product: Product, quantity: Int) {
        var productAlreadyAdded = items.any { it.product == product }
        if (productAlreadyAdded)
            throw Exception("The product have already been added. Change the amount if you want more.")

        items.add(OrderItem(this, product, quantity))
    }

    fun pay(method: PaymentMethod) {
        if (payment != null)
            throw Exception("The order has already been paid!")

        if (items.count() == 0)
            throw Exception("Empty order can not be paid!")

        payment = Payment(this, method)

        close()
    }

    private fun close() {
        closedAt = Date()
    }
}

data class OrderItem(val order:Order, val product: Product, val quantity: Int) {
    val total get() = product.price * quantity
}

data class Payment(val order: Order, val paymentMethod: PaymentMethod) {
    val paidAt = Date()
    val authorizationNumber = paidAt.time
    val amount = order.totalAmount
    val invoice = Invoice(order)
}

data class CreditCard(val number: String) : PaymentMethod

interface PaymentMethod

data class Invoice(val order: Order) {
    val billingAddress: Address = order.address
    val shippingAddress: Address = order.address
}

data class Product(val name: String, val type: ProductType, val price: Double)

// TODO future enhancement: move logic here to events
enum class ProductType {
    PHYSICAL {
        override fun shipItem(orderItem:OrderItem) {
            // This logic could be moved to a service, it is here for demonstration purpose

            // A valid shipping label should be populated here
            val shippingLabel = ShippingLabel()
            shippingLabel.print()
        }
    },
    BOOK {
        override fun shipItem(orderItem:OrderItem) {
            // This logic could be moved to a service, it is here for demonstration purpose

            // A valid shipping label should be populated here
            val shippingLabel = ShippingLabel()
            // item isento de impostos conforme disposto na Constituição Art. 150, VI, d
            shippingLabel.addNotification("no taxes");
            shippingLabel.print()
        }
    },
    DIGITAL {
        override fun shipItem(orderItem:OrderItem) {
            // This logic could be moved to a service, it is here for demonstration purpose

            // Create a valid email here
            val email = Email()
            email.send()

            orderItem.order.customer.addVoucher(10)
        }
    },
    MEMBERSHIP {
        override fun shipItem(orderItem:OrderItem) {
            SignatureService.activate(orderItem.product, orderItem.order.customer)
        }
    };

    abstract fun shipItem(orderItem:OrderItem)
}

class Address

class Customer {
    fun addVoucher(value: Int){
        if (value<=0) {
            throw Exception("Voucher should be greater than zero")
        }
        // TODO should validate max voucher?


        // TODO implement
        println("Added voucher: " + value);
    }
}

class ShippingLabel() {
    val notifications = mutableListOf<String>();

    fun print (){
        // TODO any validation required?

        // Not exactly print, but save to print later
    }

    fun addNotification(notification:String){
        notifications.add(notification)
    }
}

class Signature {
    var isActive:Boolean = false
        private set

    fun activate(){
        // TODO any validation to activate signature?

        isActive = true
    }
}

class Email {
    fun send(){
        // TODO any validation to send email?

        // TODO implement
        println("Send email");
    }
}
