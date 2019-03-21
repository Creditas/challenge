class InvoiceEmailEvent : Event<Invoice> {

    override fun handler(invoice: Invoice) {

        if(invoice is MembershipInvoice ||
                invoice is DigitalInvoice) {
            println("Email do pedido ${invoice} a ser enviada")

            println("Email do pedido ${invoice} enviada")
        }
    }

}