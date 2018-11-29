class Order
  attr_reader :customer, :items, :payment, :closed_at

  def initialize(customer, overrides = {})
    @customer = customer
    @items = []
    @order_item_class = overrides.fetch(:item_class) { OrderItem }
  end

  def add_product(product, quantity)
    @items << @order_item_class.new(order: self, product: product, quantity: quantity)
  end

  def set_payment(payment)
    @payment = payment

    close(payment.paid_at)
  end

  def total_amount
    @items.map(&:total).inject(:+) || 0
  end

private

  def close(closed_at = Time.now)
    @closed_at = closed_at
  end
end