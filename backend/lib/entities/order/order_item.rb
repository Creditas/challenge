class OrderItem
  attr_reader :order, :product, :quantity

  def initialize(order:, product:, quantity:)
    @order = order
    @product = product
    @quantity = quantity
  end

  def total
    product.price * quantity
  end
end