require_relative '../shipping/shipping_item'
module Workers
  class ShippingOrderWorker
    def self.perform(order)
      items = order.items
      items.each do |item|
        Shipping::ShippingItem.new(item).dispatch
      end
    end
  end
end