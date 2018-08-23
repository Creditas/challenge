class OrderItem
  attr_reader :order, :product, :price

  def initialize(order:, product:, price:)
    @order = order
    @product = product
    @price = price
  end

  def total
    @price
  end
end
