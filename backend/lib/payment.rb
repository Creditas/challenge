class Payment
  attr_reader :authorization_number, 
              :amount, 
              :invoice, 
              :order, 
              :payment_method, 
              :paid_at

  def initialize(attributes = {})
    @authorization_number = attributes.dig(:authorization_number)
    @amount               = attributes.dig(:amount)
    @invoice              = attributes.dig(:invoice)
    @order                = attributes.dig(:order)
    @payment_method       = attributes.dig(:payment_method)
  end

  def pay(paid_at = Time.now)
    update_payment_fields(paid_at)

    prepare_order

    order.close(@paid_at)
  end

  def paid?
    !paid_at.nil?
  end

  private

  def prepare_order
    order.prepare_items
  end

  def update_payment_fields(paid_at)
    @amount               = order.total_amount
    @authorization_number = build_authorization_number
    @invoice              = build_invoice
    @paid_at              = paid_at
  end

  def build_authorization_number
    Time.now.to_i
  end

  def build_invoice
    Invoice.new(
      billing_address: order.address, 
      shipping_address: order.address, 
      order: order
    )
  end
end