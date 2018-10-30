require_relative './shipping_factory'

class Shipping
  attr_reader :order

  def initialize(order)
    @order = order
    @factory = ShippingFactory.new
  end

  def ship
    @order.items.each do |order_item|
      shipping_method =  @factory.instance(order_item.product.type, @order.customer, item_list)
      order_item.shipped!
      order_item.shipping_log = shipping_method.dispatch
    end
  end

  def item_list
    list = ''
    total = 0
    @order.items.each do |order_item|
      if order_item.product.type == :digital
        list += order_item.product.to_s
        total += order_item.product.price
      end
    end
    list += "Order total: $ #{total}\n"

    list
  end
end
