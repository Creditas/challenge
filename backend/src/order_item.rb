class OrderItem
  attr_reader :order, :product

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

  def shipped
    @shipped
  end

  def shipping_log= log
    @shipping_log = log
  end

  def shipping_log
    @shipping_log
  end
end