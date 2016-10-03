require 'securerandom'

class Payment
  attr_reader :authorization_number, :amount, :price, :invoice, :order, :payment_method, :paid_at

  def initialize(attributes = {})
    @authorization_number, @amount = attributes.values_at(:authorization_number, :amount)
    @invoice, @order = attributes.values_at(:invoice, :order)
    @payment_method = attributes.values_at(:payment_method)
  end

  def pay(paid_at = Time.now)
    @amount = order.total_amount
    @price = order.total_price
    @authorization_number = Time.now.to_i
    @invoice = Invoice.new(billing_address: order.address, shipping_address: order.address, order: order)
    @paid_at = paid_at
    order.close(@paid_at)
  end

  def paid?
    !!paid_at
  end
end

class Invoice
  attr_reader :billing_address, :shipping_address, :order

  def initialize(attributes = {})
    @billing_address = attributes.values_at(:billing_address)
    @shipping_address = attributes.values_at(:shipping_address)
    @order = attributes.values_at(:order)
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
    Pipeline.action(itens: @items, customer: @customer)
  end

  # remember: you can create new methods inside those classes to help you create a better design

  def total_price
    @items.map(&:price).inject(:+)
  end
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

  def price
    (@product.price + @product.tax) * total
  end

  def apply(customer)
    @product.apply(customer)
  end
end

class Product
  # use type to distinguish each kind of product: physical, book, digital, membership, etc.
  attr_reader :name, :price, :type, :tax

  def initialize(name:, price:, type:)
    @name, @price, @type = name, price, type
    @tax = 0
  end
end

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

class Customer
  # you can customize this class by yourself
  attr_reader :name

  def initialize(name:)
    @name = name
    @promo_codes = []
  end

  def add_promo_code(promo_code)
    @promo_codes << promo_code
  end
end

# now, how to deal with shipping rules then?

module ShippingNotication
  def notification(name:, customer:)
    @shipping_label = SecureRandom.uuid
    "This is a shipping label #{@shipping_label} to #{customer.name} about the product: #{name}"
  end
end

module EmailNotification
  def notification(name:, customer:)
      "Send email to #{customer.name} about purchase of #{name}"
  end
end

module Tax
  def define_tax(price)
      price * 0.2
  end
end

class Physical < Product
  include ShippingNotication
  include Tax

  def initialize(name:, price:)
    super(name: name, price: price, type: :physical)
    @tax = define_tax(@price)
  end

  def apply(customer)
    notification(name: @name, customer: customer)
  end
end

class Book < Product
  include ShippingNotication

  def initialize(name:, price:)
    super(name: name, price: price, type: :book)
  end

  def apply(customer)
    notification(name: @name, customer: customer)
  end
end

class Digital < Product
  include Tax
  include EmailNotification

  def initialize(name:, price:)
    super(name: name, price: price, type: :digital)
    @tax = define_tax(@price)
  end

  def apply(customer)
    promo_code = SecureRandom.uuid
    customer.add_promo_code(promo_code)
    notification(name: @name, customer: customer)
  end
end

class Membership < Product
  # you can customize this class by yourself
  include Tax
  include EmailNotification

  def initialize(name:, price:)
    super(name: name, price: price, type: :digital)
    @tax = define_tax(@price)
  end

  def apply(customer)
    enable_membership(customer)
    notification(name: @name, customer: customer)
  end

  def enable_membership(customer)
    #enable to customer
  end
end

class Pipeline
  def self.action(itens:, customer:)
    itens.each do |item|
      p item.apply(customer)
    end
  end
end

#Example (build new payments if you need to properly test it)
foolano = Customer.new(name: "Rudolfo Borges")
physical = Physical.new(name: "Ruby shirt", price: 40)
book = Book.new(name: "Awesome book", price: 10)
digital = Digital.new(name: "Digital Ruby book", price: 5)
membership = Membership.new(name: "Ruby Online Course", price: 50)


order = Order.new(foolano)
order.add_product(physical)
order.add_product(book)
order.add_product(digital)
order.add_product(membership)

payment = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment.pay
p payment.paid? # < true
p payment.order.items.first.product.type
p "Payment description: amount:#{payment.amount} and price: #{payment.price}"
