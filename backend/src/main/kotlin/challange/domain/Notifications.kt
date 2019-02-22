package main.challenge.domain

interface Notification {
    var value: String
}

class SubscriptionNotification(override var value: String) : Notification

class DigitalItemSentNotification(override var value: String) : Notification

interface Notifyer {
    fun notify(customer: Customer?, notification: Notification)
}

class EmailNotifyer : Notifyer {
    override fun notify(customer: Customer?, notification: Notification) {
        println("Sending email to customer ${customer?.email} with content ${notification.value}")
    }
}