package challenge.service

import challenge.model.Customer
import challenge.model.OrderItem

class SignatureService {

    fun activateSignature(customer: Customer, items: List<OrderItem>) {
        println("Activating signature for customer $customer with Items: $items")
    }
}