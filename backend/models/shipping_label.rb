class ShippingLabel

  attr_reader :label, :order_item

  def initialize(order_item:, label:)
    @order_item = order_item
    @label = label
    p label
  end

end
