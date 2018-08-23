class Order
  attr_reader :customer, :items, :payment, :address, :closed_at, :email_address

  def initialize(customer, overrides = {})
    @customer = customer
    @items = []
    @address = overrides.fetch(:address) { Address.new(zipcode: '45678-979') }
    @email_address = overrides.fetch(:email_address) { customer.email_address}
  end

  def add_item(product, price)
    @items << OrderItem.new(order: self, product: product, price: price)
  end

  def total_amount
    @items.map(&:total).inject(:+)
  end

  def close(closed_at = Time.now)
    @closed_at = closed_at
    
    @items.each { |item| item.process(customer) }
  end

  def shipping_labels
    @items.select(&:shippable?).collect(&:shipping_label)
  end

  def memberships
    @items.collect(&:membership)
  end
end
