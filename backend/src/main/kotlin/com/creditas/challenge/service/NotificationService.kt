package com.creditas.challenge.service

import com.creditas.challenge.model.Order

interface NotificationService {

    fun notifyOrderPlacement(order: Order)

    fun notifyOrderPayed(order: Order)

    fun notifyOrderShipped(order: Order)

    companion object {
        val email = EmailNotificationService()
    }
}

class EmailNotificationService : NotificationService {

    override fun notifyOrderPlacement(order: Order) {
         //TODO: emailGateway.send(order.account.email, EmailNotificationTemplate.BUYER_ORDER_PLACED)
    }

    override fun notifyOrderPayed(order: Order) {
        //TODO: emailGateway.send(order.account.email, EmailNotificationTemplate.BUYER_ORDER_PAYED)
    }

    override fun notifyOrderShipped(order: Order) {
        //TODO: emailGateway.send(order.account.email, EmailNotificationTemplate.BUYER_ORDER_SENT)
    }
}

enum class EmailNotificationTemplate {
    BUYER_ORDER_PLACED,
    BUYER_ORDER_PAYED,
    SELLER_ORDER_FULFILLMENT,
    BUYER_ORDER_SENT,
    BUYER_ORDER_DELIVERED,
    PASSWORD_FORGOTTEN
}
