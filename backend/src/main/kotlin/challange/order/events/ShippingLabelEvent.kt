class ShippingLabelEvent : Event<Invoice> {

    override fun handler(invoice: Invoice) {

        if(invoice is PhysicalInvoice ||
            invoice is BookInvoice) {
            println("Geração de shipping label ${invoice.order}")

            println("Shipping label [${invoice.generateShippingLabel()}] gerada")
        }
    }

}