class Order
  attr_reader :customer, :items, :payment, :address, :closed_at, :strategies_factory

  def initialize(customer, overrides = {}, strategies_factory = StrategiesFactory)
    @customer = customer
    @items = []
    @order_item_class = overrides.fetch(:item_class) { OrderItem }
    @address = overrides.fetch(:address) { customer.default_address }
    @strategies_factory = strategies_factory
  end

  def add_product(product)
    @items << @order_item_class.new(order: self, product: product)
  end

  def total_amount
    @items.map(&:total).inject(:+)
  end

  def close(closed_at = Time.now)
    @closed_at = closed_at
  end

  def materialize_order
    items.each do |item|
      strategies_factory.get(order_item: item).execute
    end
  end

end
