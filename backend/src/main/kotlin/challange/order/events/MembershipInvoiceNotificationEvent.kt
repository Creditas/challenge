class MembershipInvoiceNotificationEvent : Event<Invoice> {

    override fun handler(invoice: Invoice) {

        if(invoice is MembershipInvoice) {
            println("Notificação de Nota fiscal ${invoice.order} de assinatura a ser enviada")

            println("Notificação de Nota fiscal ${invoice.order} de assinatura enviada")
        }
    }

}