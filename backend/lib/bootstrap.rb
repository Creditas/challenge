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
  attr_reader :name, :email, :memberships, :vouchers

  def initialize(name:, email:)
    @name = name
    @email = email
    @memberships = []
    @vouchers = []
  end

  def add_membership(product)
    @memberships << Membership.new(customer: self, product: product)
  end

  def add_voucher(value)
    @vouchers << Voucher.new(customer: self, value: value)
  end

end

class Membership
  attr_reader :customer, :product

  def initialize(customer:, product:)
    @customer = customer
    @product = product
    activate
  end

  def activate
    @started_at = Time.now
  end

  def deactivate
    @started_at = nil
  end

  def is_active?
    !@started_at.nil?
  end

end

class Voucher
  attr_reader :customer, :value

  def initialize(customer:, value:)
    @customer = customer
    @value = value
  end

end

class Shipment
  def initialize(parameters)
    @payment = parameters.fetch(:payment)
    @product = parameters.fetch(:product, nil)
  end

  def deliver
    @payment.order.items.each do |item|
      ShipmentFactory.for(item.product.type, {product: item.product, payment: @payment}).deliver
    end
  end
end

class PhysicalShipment < Shipment
  def deliver
    print_shipping_label(address: @payment.invoice.shipping_address, receiver: @payment.order.customer)
  end
end

class BookShipment < PhysicalShipment
  def deliver
    print_shipping_label(address: @payment.invoice.shipping_address, receiver: @payment.order.customer, tax_free_notification: true)
  end
end

class DigitalShipment < Shipment
  def deliver
    @payment.order.customer.add_voucher(10)
    send_digital_shipment_email(@product)
  end
end

class MembershipShipment < Shipment
  def deliver
    @payment.order.customer.add_membership(@product)
    send_membership_email(@payment.order.customer, @product)
  end
end


class ShipmentFactory
  TYPES = {
    physical: PhysicalShipment,
    book: BookShipment,
    digital: DigitalShipment,
    membership: MembershipShipment
  }

  def self.for(type, parameters)
    TYPES[type].new(parameters)
  end
end

# Book Example (build new payments if you need to properly test it)
foolano = Customer.new(name: 'foolano', email: 'fool@no.com')
book = Product.new(name: 'Awesome book', type: :book)
book_order = Order.new(foolano)
book_order.add_product(book)

payment_book = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_book.pay
p payment_book.paid? # < true
p payment_book.order.items.first.product.type

# now, how to deal with shipping rules then?
