class Payment
  attr_reader :authorization_number, :amount, :invoice, :order, :payment_method,
              :paid_at, :shipping_label

  def initialize(order:, payment_method:)
    @authorization_number = nil
    @amount = nil
    @invoice = nil
    @order = nil
    @payment_method = nil
    @paid_at = nil
    @shipping_label = nil
  end

  def paid?
    !@paid_at.nil?
  end

  def close!
    @order.close(@paid_at)
  end
end
