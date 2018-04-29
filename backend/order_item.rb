class OrderItem
  attr_reader :order, :item

  def initialize(order:, item:)
    @order = order
    @item = item
  end

  def total
    10
  end
end
