class Order
  attr_reader :customer, :payment, :address, :closed_at, :amount

  def initialize(customer)
    @customer = customer
    @address = customer.address
    @grouped_items = {}
    @amount = 0
  end

  def add_product(product, quantity=1)
    item = OrderItem.new(order: self, product: product, quantity: quantity)

    @grouped_items[product.type] ||= []

    @grouped_items[product.type] << item
    @amount += item.total_price
  end

  def items
    @grouped_items.values.flatten
  end

  def items_by_type(type)
    @grouped_items[type]
  end

  def types
    @grouped_items.keys
  end

  def close(closed_at = Time.now)
    @closed_at = closed_at
  end

  def closed?
    !! @closed_at
  end
end
