class Invoice
  attr_reader :billing_address, :shipping_address, :order

  def initialize(order:, billing_address:, shipping_address:)
    @order = order
    @billing_address = billing_address
    @shipping_address = shipping_address
  end

  def shipping_label
    "#{order.customer.name}\nCEP: #{shipping_address.zipcode}\nItem isento de impostos conforme disposto na Constituição Art. 150, VI, d."
  end
end
