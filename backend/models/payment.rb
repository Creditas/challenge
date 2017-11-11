require_relative 'invoice'
require_relative '../services/post_payment/order_processor'

class Payment
  attr_reader :authorization_number, :amount, :order, :payment_method, :paid_at

  def initialize(attributes = {})
    @order = attributes.fetch(:order)
    @amount = attributes.fetch(:amount, nil)
    @payment_method = attributes.fetch(:payment_method)
    @authorization_number = attributes.fetch(:authorization_number, Time.now.to_i)
  end

  def pay(paid_at = Time.now)
    @paid_at = paid_at
    @amount ||= order.total_amount

    @invoice = Invoice.new(order: order,
                           billing_address: order.address,
                           shipping_address: order.address)

    @order.close(self)
    PostPayment::OrderProcessor.new(@invoice).perform
  end

  def paid?
    !paid_at.nil?
  end
end
