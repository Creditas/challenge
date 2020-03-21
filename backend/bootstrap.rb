require_relative 'shipping/shipping.rb'
require_relative 'payment/paymentservice.rb'
require_relative 'notification/notification.rb'
require_relative 'payment/payment.rb'

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
end

class CreditCard
  def self.fetch_by_hashed(code)
    CreditCard.new
  end
end

class Customer
  # you can customize this class by yourself
  attr_reader :name , :email

  def initialize(name:,email:)
    @name = name
    @email = email
  end
end

class Membership
  # you can customize this class by yourself
  attr_reader :name , :email
  def initialize(name:,email:)
    @name = name
    @email = email
  end
  def enable()
      puts "membership is enabled"
     
  end
  
end

#**************************************** new classes for solution ***********************


# Book Example (build new payments if you need to properly test it)
foolano = Customer.new(name:"JOAO SILVA", email: "joao@email.com")

book = Product.new(name: 'Awesome book', type: :book)
membership = Product.new(name: 'membership book', type: :membership)
physical = Product.new(name: 'physical book', type: :physical)
digital = Product.new(name: 'physical book', type: :digital)

book_order = Order.new(foolano)
book_order.add_product(book)
book_order.add_product(membership)
book_order.add_product(physical)
book_order.add_product(digital)

#payment_book = PaymentModule::Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
#payment_book.pay
#p payment_book.paid? # < true
#p payment_book.order.items.first.product.type

paymentService = PaymentModule::PaymentService.new(productOrder: book_order, orderPayment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
paymentService.process


# now, how to deal with shipping rules then?









