package challenge.services.strategy

import challenge.domain.entities.Payment
import challenge.domain.interfaces.PaymentProcessor

class MembershipStrategy(private val payment: Payment) : PaymentProcessor {
    override fun process() {
        activateSubscription()
        notifyUser()
    }

    private fun activateSubscription() {
        println("Activating subscription")
    }

    private fun notifyUser() {
        println("Notifying user about subscription activation")
    }
}