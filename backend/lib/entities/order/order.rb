class Order
  attr_reader :customer, :items, :payment, :address, :closed_at

  def initialize(customer, overrides = {})
    @customer = customer
    @items = []
    @order_item_class = overrides.fetch(:item_class) { OrderItem }
    @address = overrides.fetch(:address) { Address.new(zipcode: '45678-979') }
  end

  def add_product(product)
    @items << @order_item_class.new(order: self, product: product)
  end

  def set_payment(payment)
    @payment = payment

    close(payment.paid_at)
  end

  def total_amount
    @items.map(&:total).inject(:+)
  end

private

  def close(closed_at = Time.now)
    @closed_at = closed_at
  end
end