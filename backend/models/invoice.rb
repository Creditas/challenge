class Invoice
  attr_reader :billing_address, :shipping_address, :order

  def initialize(order:, billing_address:, shipping_address:)
    @order = order
    @billing_address = billing_address
    @shipping_address = shipping_address
  end
end
