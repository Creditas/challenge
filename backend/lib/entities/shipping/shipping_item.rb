class ShippingItem
  attr_reader :product, :quantity

  def initialize(product, quantity)
    @product = product
    @quantity = quantity
  end
end