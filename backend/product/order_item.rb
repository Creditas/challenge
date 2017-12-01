class OrderItem
  attr_reader :order, :product

  def initialize(order, product, quantity)
    @order = order
    @product = product
  end

  def total
    10
  end
end