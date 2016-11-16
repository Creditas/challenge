require_relative 'invoice'

class Payment

  attr_reader :authorization_number, :amount, :invoice, :order, :payment_method, :paid_at, :shipping_label

  def initialize(attributes = {})
    @authorization_number, @amount = attributes.values_at(:authorization_number, :amount)
    @invoice, @order = attributes.values_at(:invoice, :order)
    @payment_method = attributes.values_at(:payment_method)
  end

  def pay(paid_at = Time.now)
    @amount = order.total_amount
    @authorization_number = Time.now.to_i
    @invoice = Invoice.new(billing_address: order.address, shipping_address: order.address, order: order)
    @paid_at = paid_at
    @order.items.each do |order_item|
        check_payment(order_item)
    end
    order.close(@paid_at)
  end

  def check_payment (order_item)
      if order_item.product.type == :physical then
          order_item.product.generate_shipping_label()
      elsif order_item.product.type == :signature_service then
          order.customer.membership.activate()
      elsif order_item.product.type == :book then
          order_item.product.generate_shipping_label_with_notification()
      elsif order_item.product.type == :digital then
          order_item.generate_voucher_discount()
          order_item.send_email()
      end
  end

  def paid?
    !paid_at.nil?
  end

end
