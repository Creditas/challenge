class Order
  attr_reader :customer, :items, :payment, :address, :closed_at

  def initialize(customer, overrides = {})
    @customer = customer
    @items = []
    @order_item_class = overrides.fetch(:item_class) { OrderItem }
    @address = overrides.fetch(:address) { Address.new(zipcode: '45678-979') }
    @discount = 0
  end

  def add_product(product)
    @items << @order_item_class.new(order: self, product: product)
  end

  def total_amount
    @items.map(&:total).inject(:+) - @discount
  end

  def close(closed_at = Time.now)
    @closed_at = closed_at
    @items.each do |item|
      item.product.actions.after_payment(item)
    end
  end

  def prepare_payment
    @items.each do |item|
      item.product.actions.before_payment(item)
    end
  end

  def add_discount(discount)
    @discount += discount
  end
end

