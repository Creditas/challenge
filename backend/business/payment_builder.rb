class PaymentBuilder
  attr_reader :payment

  def self.build(order:, payment_method:, paid_at:)
    initialize_payment(order: order, payment_method: payment_method, paid_at: paid_at)
    PaymentFlow.pay(@payment)
  end

  private

  def initialize_payment(order:, payment_method:, paid_at:)
    @payment = Payment.new
    @payment.order = order
    @payment.payment_method = payment_method
    @payment.amount = order_details.total_amount
    @payment.invoice = Invoice.new(@order)
    @payment.paid_at = paid_at
    @payment.authorization_number = paid_at.to_i
    @payment.shipping_label = ShippingLabelGenerator.create(order_details)
  end

  def order_details
    @order_details ||= OrderDetails.new(@payment.order)
  end
end
