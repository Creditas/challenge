package challenge.strategies

import challenge.model.Order

class MembershipPaymentProcessing : PaymentProcessingStrategy {
    override fun processPayment(order: Order) {
        println("Activating membership and sending notification email...")
        activateMembership(order)
        sendNotificationEmail(order)
    }

    private fun activateMembership(order: Order) {
        // Method call placeholder for membership activation
        println("Membership activated.")
    }

    private fun sendNotificationEmail(order: Order) {
        // Method call placeholder for sending email
        println("Notification email sent to the user.")
    }
}
