# frozen_string_literal: true

# Class responsible for manage a payment
# A minor refactor was performed here
class Payment
  attr_reader :invoice, :order, :payment_method, :paid_at

  def initialize(invoice:, payment_method:, order:)
    @invoice = invoice
    @order = order
    @payment_method = payment_method
    @order.payment = self
  end

  def pay(paid_at = Time.now)
    @amount = order.total_amount
    @authorization_number = Time.now.to_i
    @invoice = Invoice.new(billing_address: order.address,
                           shipping_address: order.address,
                           order: order)
    @paid_at = paid_at
    order.close(@paid_at)
  end

  def paid?
    !paid_at.nil?
  end
end # end-class
