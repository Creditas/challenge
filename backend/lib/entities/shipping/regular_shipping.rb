class RegularShipping < Shipping
  def initialize(invoice)
    @invoice = invoice
    @items = []
  end

  def label
    ShippingLabel.new(invoice.shipping_address, invoice.customer)
  end
end