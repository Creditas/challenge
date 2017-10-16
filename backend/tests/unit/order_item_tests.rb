require 'minitest/autorun'
require_relative '../../src/domain/_seedwork/domain_event_publisher'
require_relative '../../src/domain/orders/order_item_closed'
require_relative 'order_item_builder'

class OrderItemTests <  MiniTest::Test
  def test_close_should_publish_an_order_item_closed_event
    product_type = :membership
    order_item = OrderItemBuilder.new().of_type(product_type).build()
    event_type = "#{product_type}_item_closed".to_sym
    mock = MiniTest::Mock.new
    mock.expect(:publish, nil, [event_type, OrderItemClosed])
    DomainEventPublisher.current = mock

    order_item.close

    assert_mock mock
  end
end