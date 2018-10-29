require 'test/unit'
require_relative '../src/order'
require_relative '../src/order_item'
require_relative '../src/address'

class OrderTest < Test::Unit::TestCase

  def setup
    @order = Order.new(nil)
  end

  def test_can_create_order
    assert_instance_of(Order, @order)
  end

  def test_can_get_order_data
    assert_nil(@order.customer)
    assert_empty(@order.items)
    assert_instance_of(Address, @order.address)
  end

  def test_can_add_product
    @order.add_product({:total => 10})
    assert_not_empty(@order.items)
  end

  def test_can_get_total_one_product
    @order.add_product({:total => 10})
    assert_equal(10, @order.total_amount)
  end

  def test_can_get_total_multiple_products
    @order.add_product({:total => 10})
    @order.add_product({:total => 10})
    @order.add_product({:total => 10})
    assert_equal(30, @order.total_amount)
  end

  def test_can_close_order
    now = Time.now
    @order.close(now)
    assert_equal(now, @order.closed_at)
    assert_not_nil(@order.closed_at)
  end
end
