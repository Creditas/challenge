package com.challange.domain.entities

import com.challange.data.Email
import com.challange.data.ShippingLabel
import com.challange.domain.enum.EProductType
import com.challange.domain.interfaces.IOrderInterface
import com.sun.istack.internal.NotNull

class Order(@NotNull val customer: Customer, @NotNull var orderItem: OrderItem, @NotNull var payment: Payment): IOrderInterface {

    /*
        I am doing the payment inside of the order, because I´ve already have the entity Payment
        So basically, I just need to call that method inside of the order
        Here, it won´t have any logic about the payment
     */
    override fun executePayment() {
        this.payment.pay(orderItem)
    }

    /*
        That method will generate the logic fo the things asked on the test
        So, here, it will see if what is the type of the item, and then, execute the action needed
     */
    override fun generateThreatment() {
        if(this.orderItem.productsAdded.count() > 0) {
            this.orderItem.productsAdded.forEach {
                when(it.typeOfProduct) {
                    EProductType.PHYSICAL -> this.generateShippingLabel(false)
                    EProductType.BOOK -> this.generateShippingLabel(true)
                    EProductType.MEMBERSHIP -> this.generateSomething()
                    EProductType.DIGITAL -> this.activateSubscription(customer)
                }
            }
        }
    }


    override fun activateSubscription(customer: Customer) {
        this.customer.subscriptions.activateSubscription()
        val email = Email()
        email.sendEmail(customer)
    }

    override fun generateShippingLabel(isARegularBook: Boolean) {
        val shippingLabel = ShippingLabel()
        shippingLabel.generateShippingLabel(isARegularBook)
    }
}