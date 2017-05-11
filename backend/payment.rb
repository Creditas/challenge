class Payment
  attr_reader :authorization_number, :amount, :invoice, :order, :payment_method, :paid_at

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
    ship
    order.close(@paid_at)
  end

  def ship
    ShippingDetails.new(@order)
  end

  def shipping_status
    ShippingDetails.new(@order).status
  end

  def paid?
    !paid_at.nil?
  end
end

class ShippingDetails
  attr_reader :status, :products

  def initialize(order)
    @order = order
    @products = get_products
    @status = ship
  end

  private

  # Output: array of strings, with shipping preferences
  def ship
    status = []
    product_types = get_products
    product_types.each do |object|
      type = Object.const_get("#{object.type.capitalize}") #looks for module/class with constant name in parenthesis
      status << type.shipping(object)
    end
    # If there are repeated shipping details, we make them unique
    status.uniq
  end

  def get_products
    @order.items.map{|order_item| order_item.product}
  end

end
