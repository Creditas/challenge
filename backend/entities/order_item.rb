class OrderItem
  attr_reader :order, :product

  def initialize(order:, product:)
    @order = order
    @product = product
  end

  def price
    @product.price
  end
end
