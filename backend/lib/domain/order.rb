module Domain
  class Order
    attr_reader :customer, :items, :payment, :address, :closed_at

    def initialize(customer, overrides = {})
      @customer = customer
      @items = []
      @order_item_class = overrides.fetch(:order_item_class) { OrderItem }
      @order_item_flow_factory_class = overrides.fetch(:order_item_flow_factory_class) { ::Domain::Factories::OrderItemFlowFactory }
      @address = overrides.fetch(:address) { Address.new(zipcode: '45678-979') }
    end

    def add_product(product)
      @item = @order_item_class.new(order: self, product: product)
      @order_item_flow = @order_item_flow_factory_class.new(product).get_order_item_flow
      @order_item_flow.new(self, @item).execute
      @items << @item
    end

    def subtotal
      @items.map(&:total).inject(&:+) || 0
    end

    def total_discount
      @items.map(&:discount_value).inject(&:+) || 0
    end

    def total
      subtotal - total_discount
    end

    def close(closed_at = Time.now)
      @closed_at = closed_at
    end
  end
end
