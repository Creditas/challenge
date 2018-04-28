require File.join(File.dirname(__FILE__), "/helpers/load")
require File.join(File.dirname(__FILE__), "/notifications/load")
require File.join(File.dirname(__FILE__), "/process_payments/load")


class Payment
  attr_reader :authorization_number, :amount, :invoice, :order, :payment_method, :paid_at, :membership

  def initialize(attributes = {})
    @authorization_number, @amount = attributes.values_at(:authorization_number, :amount)
    @invoice, @order = attributes.values_at(:invoice, :order)
    @payment_method = attributes.values_at(:payment_method)
    @membership = attributes.values_at(:membership)
  end

  def pay(paid_at = Time.now)
    @amount = order.total_amount
    @authorization_number = Time.now.to_i
    @invoice = Invoice.new(billing_address: order.address, shipping_address: order.address, order: order)
    @paid_at = paid_at
    order.close(@paid_at)
  end

  def paid?
    !paid_at.nil?
  end
end

class Invoice
  attr_reader :billing_address, :shipping_address, :order

  def initialize(attributes = {})
    @billing_address = attributes.values_at(:billing_address)
    @shipping_address = attributes.values_at(:shipping_address)
    @order = attributes.values_at(:order)
  end

  def shipping_label
    result = ''
    @shipping_address.each do |address|
      result += address.normalize
    end

    result
  end
end

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

  def total_amount
    @items.map(&:total).inject(:+)
  end

  def close(closed_at = Time.now)
    @closed_at = closed_at
  end

  # remember: you can create new methods inside those classes to help you create a better design
end

class OrderItem
  attr_reader :order, :product

  def initialize(order:, product:)
    @order = order
    @product = product
  end

  def total
    10
  end
end

class Product
  # use type to distinguish each kind of product: physical, book, digital, membership, etc.
  attr_reader :name, :type

  def initialize(name:, type:)
    @name, @type = name, type
  end
end

class Address
  attr_reader :zipcode

  def initialize(zipcode:)
    @zipcode = zipcode
  end

  def normalize
    "zipcode: #{zipcode}"
  end
end

class CreditCard
  def self.fetch_by_hashed(code)
    CreditCard.new
  end
end

class Customer
  attr_reader :name, :email, :membership, :membership_at, :vouchers

  def initialize(name, email, zipcode)
    @name, @email, @zipcode = name, email, zipcode
    @vouchers = []
  end

  def to_member(membership)
    @membership = membership
    @membership_at = Time.now
  end

  def add_voucher(voucher)
    @vouchers << voucher
  end
end

class Membership
  attr_reader :type, :privileges

  def initialize(type)
    @type = type
    case type
      when :admin
        @privileges = ['read', 'write', 'remove']
      when :basic
        @privileges = ['read']
      else
        fail ArgumentError, 'membership type not supported'
    end
  end
end

# Book Example (build new payments if you need to properly test it)
foolano = Customer.new('Adrian', 'adrian@test.com', '000000')
book = Product.new(name: 'Awesome book', type: :book)
book_order = Order.new(foolano)
book_order.add_product(book)

payment_book = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
process_payment = ProcessPayments::Factory.create(payment_book)
process_payment.execute


# Digital Example
foolano = Customer.new('Megan', 'megan@test.com', '111111')
product = Product.new(name: 'Music', type: :digital)
order = Order.new(foolano)
order.add_product(product)

payment = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
process_payment = ProcessPayments::Factory.create(payment)
process_payment.execute

# Membership Example
foolano = Customer.new('Stefany', 'stefany@test.com', '22222')
product = Product.new(name: 'Membership', type: :membership)
membership = Membership.new(:admin)
order = Order.new(foolano)
order.add_product(product)

payment = Payment.new(order: order, membership: membership, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
process_payment = ProcessPayments::Factory.create(payment)
process_payment.execute
# now, how to deal with shipping rules then?
