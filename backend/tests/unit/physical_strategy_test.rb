class PhysicalStrategyTest
  include Assert
  include Common

  def run
    order_item = create(:order_item)
    strategy = PhysicalStrategy.new(order_item: order_item)

    shipping_label = strategy.execute

    assert shipping_label.is_a? ShippingLabel
    assert !shipping_label.label.include?("Item isento de impostos conforme disposto na Constituição Art. 150, VI, d")
  end
end
