class OrderItem
  attr_reader :product,
              :quantity

  def initialize  product:,  quantity: 1
    @product = product
    @quantity = quantity
  end

  def type
    @product.type
  end

  def total
    @product.price * quantity
  end
end
