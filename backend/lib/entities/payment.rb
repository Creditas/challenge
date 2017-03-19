class Payment
  attr_reader :authorization_number, :amount, :invoice, :order, :payment_method, :paid_at

  def initialize(attributes = {})
    @authorization_number, @amount = attributes.values_at(:authorization_number, :amount)
    @invoices = Array(attributes[:invoice])
    @order = attributes.fetch(:order)
    @payment_method = attributes[:payment_method]
  end

  def pay(paid_at = Time.now)
    @amount = order.amount
    @authorization_number = Time.now.to_i
    @order.types.each do |type|
      @invoices << InvoiceFactory.build(
        type: type,
        billing_address: order.address,
        shipping_address: order.address,
        order: order
      )
    end
    @paid_at = paid_at
    order.close(@paid_at)
  end

  def paid?
    order.closed?
  end
end
