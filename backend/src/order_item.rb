class OrderItem
  attr_accessor :shipping_log
  attr_reader :order, :product, :shipped

  def initialize(order:, product:)
    @order = order
    @product = product
    @shipped = false
  end

  def total
    10
  end

  def shipped!
    @shipped = true
  end
end
