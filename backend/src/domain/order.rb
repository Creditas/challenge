require_relative 'address'

class Order
  attr_reader :customer, :shipping_address, :closed_at

  def initialize(customer, shipping_address)
    @customer = customer
    @shipping_address = shipping_address
    @items = Hash.new
  end

  def items
    @items.each_value
  end

  def add_product(product)
    if @items[product.id] == nil
      @items[product.id] = OrderItem.new(self, product, 1)
    else
      @items[product.id].amount += 1
    end
  end

  def total_amount
    @items.each_value.map(&:amount).inject(:+)
  end

  def close(closed_at = Time.now)
    @closed_at = closed_at
  end
end

class OrderItem
  attr_reader :product, :amount, :order
  attr_writer :amount

  def initialize(order, product, amount)
    @order = order
    @product = product
    @amount = amount
  end
end