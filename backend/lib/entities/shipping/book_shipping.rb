class BookShipping < Shipping
  NOTE = "Item isento de impostos conforme disposto na Constituição Art. 150, VI, d."

  def initialize(invoice)
    @invoice = invoice
  end

  def label
    ShippingLabel.new(invoice.shipping_address, invoice.customer, NOTE)
  end
end