require_relative 'invoice'
require_relative '../service/post_payment'
class Payment
  attr_reader :authorization_number, :invoice, :order, :payment_method, :paid_at

  def initialize(order, payment_method)
    @order = order
    @payment_method = payment_method
  end

  def pay(paid_at = Time.now)
    @amount = 10
    @authorization_number = Time.now.to_i
    @invoice = Invoice.new(order)
    @paid_at = paid_at
    Service::PostPayment.new(@invoice).start
    order.close(@paid_at)
  end

  def paid?
    !paid_at.nil?
  end
end
