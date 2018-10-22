class Order
  attr_reader :customer, :items, :payment, :address, :closed_at

  def initialize(customer, overrides = {})
    @customer = customer
    @items = []
    @item_factory = overrides.fetch(:item_factory) { OrderItem::Factory }
    @address = overrides.fetch(:address) { customer.address }
  end

  def add_product(product, quantity: nil)
    @items << @item_factory
              .build(order: self,
                     product: product,
                     quantity: quantity)
  end

  def total_amount
    @items.map(&:total).inject(0, :+)
  end

  def close(closed_at = Time.now)
    @closed_at = closed_at
  end
end

