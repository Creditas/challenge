class DeliveryRequest
  attr_reader :product, :order

  def initialize(product, order)
    @product = product
    @order = order
  end

  def type
    @product.type
  end

  def shipping_address
    @order.shipping_address
  end

  def customer
    @order.customer
  end

  def description
    @product.description
  end

end