require_relative './order_item'
require_relative '../infra/pub_sub'
require_relative '../infra/topic'

class Order
  attr_reader :customer, :products, :closed_at, :shipping_address, :payment_method

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

  def pay_with(payment_method)
    @payment_method = payment_method
  end

  def close(closed_at = Time.now)
    @closed_at = closed_at
    PubSub.instance.publish(Topics::ORDER_CLOSED, self)
  end

end