require_relative 'invoice'

class Payment
  attr_reader :authorization_number, :amount, :invoice, :order, :payment_method, :paid_at

  def initialize(order, attributes = {})
    @order = order
    @authorization_number = attributes.values_at(:authorization_number)
    @payment_method = attributes.values_at(:payment_method)
  end

  def pay(paid_at = Time.now)
    @amount = order.total_amount
    @authorization_number = Time.now.to_i
    @paid_at = paid_at
    @invoice = Invoice.new(billing_address: order.address, shipping_address: order.address, order: order)
  end

  def paid?
    !paid_at.nil?
  end
end