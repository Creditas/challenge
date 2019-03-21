class GenerateCreditEvent : Event<Invoice> {

    override fun handler(invoice: Invoice) {

        if(invoice is DigitalInvoice) {
            println("Geraçãp de cupom de desconto da nota ${invoice} sobre mídia digital")

            println("Cupm de R$10 gerado para nota ${invoice} sobre mídia")

            EventManager.publish(OrderEvents.Consts.CreatedCreditDiscount, invoice)
        }
    }

}