class Order
  attr_reader :customer, :items, :payment, :address, :closed_at

  def initialize(customer, overrides = {})
    @customer = customer
    @items = []
    @order_item_class = overrides.fetch(:item_class) { OrderItem }
    @address = overrides.fetch(:address) { Address.new(zipcode: '45678-979') }
  end

  def add_product(product)
    @items << @order_item_class.new(order: self, product: product)
  end

  def shipping_details
    ShippingDetails.new(self).description
  end

  def total_amount
    @items.map(&:total).inject(:+)
  end

  def close(closed_at = Time.now)
    @closed_at = closed_at
  end

end

##  CLASSES FOR ORDER DETAILS ##
class Address
  attr_reader :zipcode

  def initialize(zipcode:)
    @zipcode = zipcode
  end
end

class CreditCard
  def self.fetch_by_hashed(code)
    CreditCard.new
  end
end

class ShippingDetails
  def initialize(order)
    @order = order
  end

  # Output: array of strings, with shipping preferences
  def description
    description = []
    product_types = get_products
    product_types.each do |object|
      type = Object.const_get("#{object.type.capitalize}") #looks for module/class with constant name in parenthesis
      description << type.shipping(object)
    end
    # If there are repeated shipping details, we make them unique
    description.uniq
  end

  def get_products
    @order.items.map{|order_item| order_item.product}
  end

  private

  def shipping_preferences
    define_type.shipping
  end

end
