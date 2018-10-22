class OrderItem
  attr_reader :order, :product, :quantity

  def initialize(order:, product:, quantity: nil)
    @order = order
    @product = product
    @quantity = quantity || 1
  end

  def total
    @quantity * @product.price
  end
end
