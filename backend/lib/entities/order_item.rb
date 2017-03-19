class OrderItem
  attr_reader :order, :product, :quantity

  def initialize(order:, product:, quantity: 1)
    @order = order
    @product = product
    @quantity = quantity
  end

  def name
    product.name
  end

  def price
    product.price
  end

  def total_price
    product.price * quantity
  end

  def type
    @product.type
  end
end
