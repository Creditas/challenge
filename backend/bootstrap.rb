# Payment class
class Payment
  attr_reader :authorization_number, :amount, :invoice, :order, :payment_method,
              :paid_at

  def initialize(args)
    @order = args.fetch(:order)
    @payment_method = args.fetch(:payment_method)
    @amount = @order.total_amount
  end

  def pay(paid_at = Time.now)
    @authorization_number = Time.now.to_i
    @invoice = Invoice.new(
      billing_address: order.address,
      shipping_address: order.address,
      order: order)
    @paid_at = paid_at
    order.dispatch
    order.close(@paid_at)
  end

  def paid?
    !paid_at.nil?
  end
end

# Invoice class
class Invoice
  attr_reader :billing_address, :shipping_address, :order

  def initialize(args)
    @billing_address = args.fetch(:billing_address)
    @shipping_address = args.fetch(:shipping_address)
    @order = args.fetch(:order)
  end
end

# Order class
class Order
  attr_reader :customer, :items, :payment, :address, :closed_at, :sent_at

  def initialize(customer, overrides = {})
    @customer = customer
    @items = []
    @order_item_class = overrides.fetch(:item_class) { OrderItem }
    @address = overrides.fetch(:address) { customer.address }
  end

  def add_product(product)
    @items << @order_item_class.new(order: self, product: product)
  end

  def total_amount
    @items.map(&:total).inject(:+)
  end

  def dispatch(sent_at = Time.now)
    @items.map(&:ship)
    @sent_at = sent_at
  end

  def sent?
    !sent_at.nil?
  end

  def close(closed_at = Time.now)
    @closed_at = closed_at
  end

  # remember: you can create new methods inside those classes to help you create
  # a better design
end

# OrderItem class
class OrderItem
  attr_reader :order, :product

  def initialize(args)
    @order = args.fetch(:order)
    @product = args.fetch(:product)
  end

  def ship
    Shipment.send(@product.type, @order, @product)
  end

  def total
    10
  end
end

# Product class
class Product
  # use type to distinguish each kind of product: physical, book, digital,
  # membership, etc.
  attr_reader :name, :type

  def initialize(args)
    @name = args.fetch(:name)
    @type = args.fetch(:type)
  end
end

# Address class
class Address
  attr_reader :zipcode

  def initialize(zipcode)
    @zipcode = zipcode
  end
end

# CreditCard class
class CreditCard
  def self.fetch_by_hashed(_)
    CreditCard.new
  end
end

# Customer class
class Customer
  attr_reader :name, :email, :address

  def initialize(args)
    @name = args.fetch(:name)
    @email = args.fetch(:email)
    @address = args.fetch(:address)
  end
end

# Membership class
class Membership
  attr_reader :name, :active

  def initialize(args)
    @name = args.fetch(:name)
  end

  def activate
    @active = 'yes'
  end

  def deactivate
    @active = nil
  end

  def is_active?
    !@active.nil?
  end
end

# Shipment documentation
class Shipment
  def self.physical(order, _)
    ShippingLabel.new(order)
  end

  def self.membership(order, service)
    email = Email.new(order.customer)
    membership = Membership.new(name: service.name)
    membership.activate
    { email: email, membership: membership }
  end
end

# ShippingLabel class
class ShippingLabel
  attr_reader :name, :shipping_address

  def initialize(order)
    @name = order.customer.name
    @shipping_address = order.address
  end

  def print
    p format('Shipping label to %s', @name)
  end
end

# ShippingLabelNotify
class ShippingLabelNotify < ShippingLabel
  attr_reader :notification

  def create_notification
    @notification = 'Notification'
  end
end

# Email
class Email
  attr_reader :name, :address

  def initialize(customer)
    @name = customer.name
    @address = customer.email
  end

  def print
    p format('Email sent to %s', @address)
  end
end
