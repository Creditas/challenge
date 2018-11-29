class Invoice
  attr_reader :order, :customer, :billing_address, :shipping_address

  def initialize(order, customer)
    @order = order
    @customer = customer
    @billing_address = customer.billing_address
    @shipping_address = customer.shipping_address
  end
end