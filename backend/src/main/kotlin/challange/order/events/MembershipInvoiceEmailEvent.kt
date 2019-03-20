class MembershipInvoiceEmailEvent : Event<Invoice> {

    override fun handler(invoice: Invoice) {

        if(invoice is MembershipInvoice) {
            println("Email de assinatura ${invoice.order} a ser enviada")

            println("Email de assinatura ${invoice.order} enviada")
        }
    }

}