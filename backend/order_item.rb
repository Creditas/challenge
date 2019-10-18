class OrderItem
  attr_reader :order, :item

  def initialize(order:, item:)
    @order = order
    @item = item
  end
end
