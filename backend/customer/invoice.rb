require_relative '../infra/topic'

class Invoice
  attr_reader :billing_address, :shipping_address, :order

  def initialize(billing_address, order)
    @billing_address = billing_address
    @shipping_address = order.shipping_address
    @order = order
  end

  def list_products
    order.products
  end

  def get_customer
    order.customer
  end

  def type
    Topics.PAID_INVOICE
  end

end