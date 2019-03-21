class ShippingLabelEvent : Event<Invoice> {

    override fun handler(invoice: Invoice) {

        if(invoice is PhysicalInvoice ||
            invoice is BookInvoice) {
            println("Geração de shipping label da nota ${invoice}")

            println("Shipping label [${invoice.generateShippingLabel()}] da nota ${invoice} gerada")
        }
    }

}