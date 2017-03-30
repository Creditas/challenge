require_relative './payment'
require_relative './order_item'

class Order
  attr_reader :customer,
              :items,
              :shipping_address,
              :billing_address,
              :closed_at

  def initialize customer:, shipping_address:, billing_address:
    @customer = customer
    @shipping_address = shipping_address
    @billing_address = billing_address
    @items = []
  end

  def items_by_type
    @items.group_by(&:type)
  end

  def pay! payment_method, paid_at = Time.now
    close paid_at
    payment = Payment.new order: self,
                          payment_method: payment_method

    payment.pay! paid_at
  end

  def add_product product, quantity
    @items << OrderItem.new(product: product, quantity: quantity)
  end

  def total_amount
    @items.map(&:total).inject(:+)
  end

  def close closed_at
    @closed_at = closed_at
  end
end
