class OrderDetails
  attr_reader :order

  def initialize(order)
    @order = order
  end

  def total_amount
    @order.items.map(&:price).inject(:+)
  end

  def customer
    @order.customer
  end
end
