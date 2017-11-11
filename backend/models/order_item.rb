class OrderItem
  attr_reader :order, :product

  def initialize(order:, product:)
    @order = order
    @product = product
  end

  def type
    @product.type
  end

  def total
    @product.price
  end
end
