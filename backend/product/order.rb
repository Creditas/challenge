require_relative './order_item'

class Order
  attr_reader :customer, :products, :closed_at, :shipping_address

  def initialize(customer)
    @customer = customer
    @products = []
  end

  def add_product(product)
    @products << product
  end

  def total_amount
    @products.map(&:total).inject(:+)
  end

  def ship_to(address)
    @shipping_address = address
  end

  def close(closed_at = Time.now)
    @closed_at = closed_at
  end

end