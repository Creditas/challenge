class Payment
  attr_reader :authorization_number, :amount, :invoice, :order, :payment_method, :paid_at

  def initialize(attributes = {})
    @authorization_number, @amount = attributes.values_at(:authorization_number, :amount)
    @invoice, @order = attributes.values_at(:invoice, :order)
    @payment_method = attributes.values_at(:payment_method)
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

  def deliver
    @items.each do |item|
      Ship.send(item.product.type, item)
    end
  end
end

class Ship
  def self.book(item)
    Print.shipping_label_tax_free(item.order.address, item.product)
  end

  def self.physical(item)
    Print.shipping_label(item.order.address, item.product)
  end

  def self.digital(item)
    item.order.customer.add_voucher(Voucher.new(10.00))

    Notification.digital_purchase(item.product, item.order.customer.email)
  end

  def self.membership(item)
    item.product.activate

    Notification.membership_activated(item.product, item.order.customer.email)
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
  attr_reader :email, :vouchers

  def initialize(email)
    @email = email
    @vouchers = []
  end

  def add_voucher(voucher)
    vouchers << voucher
  end
end

class Membership < Product
  attr_reader :active

  def initialize(name:)
    super(name: name, type: :membership)
    @active = false
  end

  def activate
    @active = true
  end
end

class Print
  def self.shipping_label(address, product)
  end

  def self.shipping_label_tax_free(address, product)
  end
end

class Notification
  def self.membership_activated(membership, email)
  end

  def self.digital_purchase(membership, email)
  end
end

class Voucher
  attr_reader :discount, :active

  def initialize(discount)
    @discount = discount
    @active = true
  end
end
