require 'test/unit'
require_relative '../src/order_item'

class OrderItemTest < Test::Unit::TestCase

  def setup
    @order_item = OrderItem.new(order: nil, product: nil)
  end

  def test_can_create_order_item
    assert_instance_of(OrderItem, @order_item)
  end

  def test_can_read_item_data
    assert_nil(@order_item.order)
    assert_nil(@order_item.product)
  end

  def test_can_get_total
    assert_equal(10, @order_item.total)
  end
end
