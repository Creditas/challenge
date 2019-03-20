class GenerateCreditEvent : Event<Invoice> {

    override fun handler(invoice: Invoice) {

        if(invoice is DigitalInvoice) {
            println("Geraçãp de cupom de desconto da nota ${invoice.order} sobre mídia digital")

            println("Cupm de R$10 gerado para nota ${invoice.order} sobre mídia")

            EventManager.publish(OrderEvents.Consts.CreatedCreditDiscount, invoice)
        }
    }

}