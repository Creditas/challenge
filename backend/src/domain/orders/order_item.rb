require_relative '../_seedwork/domain_event_publisher'
require_relative 'order_item_closed'

class OrderItem
  attr_reader :order, :product

  def initialize(order:, product:)
    @order = order
    @product = product
  end

  def total
    10
  end

  def close
  	event_type = "#{@product.type}_item_closed".to_sym
  	DomainEventPublisher.current.publish(event_type, OrderItemClosed.new(@order.customer.id, @order.id))
  end

  def to_s
    "Name: #{product.name}, Type: #{product.type}"
  end
end