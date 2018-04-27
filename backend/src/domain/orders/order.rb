require_relative 'order_item'
require_relative 'payment'
require_relative '../customers/address'

class Order
  attr_reader :id, :customer, :items, :payment, :address, :closed_at

  def initialize(id, customer, overrides = {})
    @id = id
    @customer = customer
    @items = []
    @address = overrides.fetch(:address) { Address.new(zipcode: '45678-979') }
  end

  def add_product(product)
    @items << OrderItem.new(order: self, product: product)
  end

  def total_amount
    @items.map(&:total).inject(:+)
  end

  def add_payment(payment_method)
    @payment = Payment.new(self, payment_method: payment_method)
  end

  def pay
    @payment.pay
    close
  end

  def invoice
    @payment.invoice
  end

  def to_s
    order_as_string = "Order #{id} - Total #{total_amount}\n"
    @items.each { |item| order_as_string << "#{item}\n" }
    order_as_string
  end

  private 

  def close(closed_at = Time.now)
    @closed_at = closed_at
    @items.each { |item| item.close() }
  end 
end