require_relative "./shipment/ShipmentManager"

class Payment
  attr_reader :authorization_number, :amount, :invoice, :order, :payment_method, :paid_at, :voucher

  def initialize(attributes = {})
    @authorization_number, @amount = attributes.values_at(:authorization_number, :amount)
    @invoice, @order = attributes.values_at(:invoice, :order)
    @payment_method = attributes.values_at(:payment_method)
  end

  def pay(paid_at = Time.now, options = {})
    @voucher = options.fetch('voucher', nil)
    @amount = order.total_amount

    # If a voucher was supplied, apply the discount
    @amount -= @amount * (voucher.discount / 100) if (@voucher != nil)

    @authorization_number = Time.now.to_i
    @invoice = Invoice.new(billing_address: order.address, shipping_address: order.address, order: order)
    @paid_at = paid_at
    order.close(@paid_at)

    #handle shipment
    shipmentManager = ShipmentManager.new
    shipmentManager.handle_shipment_rules(@order.customer, self)
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
  attr_reader :email, :membership, :vouchers

  def initialize(email, options = {})
    @email = email
    @membership = options.fetch('membership', Membership.new)
    @vouchers = options.fetch('vouchers', Array.new)
  end

  def add_voucher(voucher)
    @vouchers << voucher
  end
end

class Membership
  attr_reader :customer, :is_active, :last_modified

  def activate_membership
    @is_active = true
    @last_modified = Time.now
  end

  def deactivate_membership
    @is_active = false
    @last_modified = Time.now
  end
end

class Voucher
  attr_reader :discount, :customer

  def initialize(discount, customer)
    @discount = discount
    @customer = customer
  end
end

# Book Example
foolano = Customer.new('email@email.com')
book = Product.new(name: 'Awesome book', type: :book)
book_order = Order.new(foolano)
book_order.add_product(book)

payment_book = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_book.pay

# Music Example 
music = Product.new(name: 'Awesome Music', type: :digital)
music_order = Order.new(foolano)
music_order.add_product(music)

payment_music = Payment.new(order: music_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_music.pay

# Physical Example
physical = Product.new(name: 'Awesome product', type: :physical)
physical_order = Order.new(foolano)
physical_order.add_product(physical)

payment_physical = Payment.new(order: physical_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_physical.pay

# Subscription Example
membership = Product.new(name: 'Awesome subscription', type: :membership)
membership_order = Order.new(foolano)
membership_order.add_product(membership)

payment_membership = Payment.new(order: membership_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_membership.pay