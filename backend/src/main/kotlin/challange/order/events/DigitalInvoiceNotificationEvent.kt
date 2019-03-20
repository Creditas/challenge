class DigitalInvoiceNotificationEvent : Event<Invoice> {

    override fun handler(invoice: Invoice) {

        if(invoice is DigitalInvoice) {
            println("Notificação de Nota fiscal ${invoice.order} de mídia digital a ser enviada")

            println("Notificação de Nota fiscal ${invoice.order} de mídia digital enviada")
        }
    }

}