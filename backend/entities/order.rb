class Order
  attr_reader :customer, :items, :payment, :address, :closed_at

  def initialize(*attrs)
    @customer = attrs.values_at(:customer)
    @address = attrs.values_at(:address)
    @payment = attrs.values_at(:payment)
    @items = []
    @closed_at = nil
  end

  def add_item(product)
    @items << OrderItem.new(order: self, product: product)
  end

  def close(closed_at = Time.now)
    @closed_at = closed_at
  end

  def has_physical_items?
    @items.any? { |item| item.product.is_physical? }
  end

  def has_books?
    @items.any? { |item| item.product.is_book? }
  end
end
