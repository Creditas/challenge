class MembershipInvoiceNotificationEvent : Event<Invoice> {

    override fun handler(invoice: Invoice) {

        if(invoice is MembershipInvoice) {
            println("Notificação de assinatura do pedido ${invoice} a ser enviada")

            println("Notificação de assinatura do pedido  ${invoice} enviada")
        }
    }

}