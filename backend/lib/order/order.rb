class Order
  attr_reader :customer, :items, :payment, :shipping_address, :billing_address, :closed_at

  def initialize(customer, overrides = {})
    @customer = customer
    @items = []
  end

  def add_product(product)
    case product.type.to_s
      when 'digital'
        @items << DigitalOrderItem.new(order: self, product: product)
      when 'membership'
        @items << MembershipOrderItem.new(order: self, product: product)
      when 'book'
        @items << TaxFreeOrderItem.new(order: self, product: product)
      else
        @items << OrderItem.new(order: self, product: product)
    end
  end

  def add_shipping_address(shipping_address)
    @shipping_address = shipping_address
  end

  def add_billing_address(billing_address)
    @billing_address = billing_address
  end

  def total_amount
    @items.map(&:total).inject(:+)
  end

  def close(closed_at = Time.now)
    @closed_at = closed_at
  end

end