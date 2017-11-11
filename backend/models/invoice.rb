class Invoice
  attr_reader :billing_address, :shipping_address, :order

  def initialize(attributes = {})
    @order = attributes.fetch(:order)
    @billing_address = attributes.fetch(:billing_address)
    @shipping_address = attributes.fetch(:shipping_address)
  end

  def customer
    @order.customer
  end
end