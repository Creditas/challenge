class Invoice
  attr_reader :billing_address, :shipping_address, :order

  def initialize(order)
    @order = order
    @billing_address, @shipping_address = order.address
  end
end
