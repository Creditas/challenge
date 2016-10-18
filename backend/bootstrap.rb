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
    @invoice = Invoice.new(billing_address: order.address,
                           shipping_address: order.address,
                           order: order,
                           shipping_label: shipping_label)
    @paid_at = paid_at
    order.close(@paid_at)
  end

  def paid?
    !paid_at.nil?
  end

  def shipping_label
    "shipping_label" if self.order.items.first.product.type == :physical_item
    "no_taxes_shipping_label" if self.order.items.first.product.type == :book
  end
end

class Invoice
  attr_reader :billing_address, :shipping_address, :order, :shipping_label

  def initialize(attributes = {})
    @billing_address = attributes.values_at(:billing_address)
    @shipping_address = attributes.values_at(:shipping_address)
    @order = attributes.values_at(:order)
    @shipping_label = attributes.values_at(:shipping_label)
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
  attr_reader :voucher

  def initialize()
    @voucher = 0
  end

  def notify!(payment)
    puts "mail(to: #{self}, subject: #{payment.invoice.shipping_label})"
  end

  def send_voucher(payment)
    puts "You received a voucher of $10."
    @voucher += 10
    puts "mail(to: #{self}, subject: You bought a #{payment.order.items.first.product.type}) product"
  end
end

class Membership
  def initialize(customer:)
    @customer = customer
  end

  def notify!
    puts "mail(to: #{@customer}, subject: 'Membership Created')"
  end
end

#---------------------
# => Book Example
#---------------------
puts "Exemplo Book"
foolano = Customer.new
book = Product.new(name: 'Awesome book', type: :book)
book_order = Order.new(foolano)
book_order.add_product(book)

payment_book = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_book.pay
if payment_book.paid?
  foolano.notify!(payment_book)
end

#---------------------
# => Membership Example
#---------------------
puts ""
puts "Exemplo Membership"
foolano2 = Customer.new
membership = Product.new(name: 'Membership', type: :membership)
membership_order = Order.new(foolano2)
membership_order.add_product(membership)

payment_membership = Payment.new(order: membership_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_membership.pay

if payment_membership.paid?
  create_membership = Membership.new(customer: foolano2)
  create_membership.notify!
end

#---------------------
# => Physical Item
#---------------------
puts ""
puts "Exemplo Physical Item"
physical_item = Product.new(name: 'Awesome Physical Item', type: :physical_item)
physical_item_order = Order.new(foolano)
physical_item_order.add_product(physical_item)

payment_physical_item = Payment.new(order: physical_item_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_physical_item.pay
if payment_physical_item.paid?
  foolano.notify!(payment_physical_item)
end

#---------------------
# => Digital Media
#---------------------
puts ""
puts "Exemplo Digital Media"
digital_item = Product.new(name: 'Jethro Tull Aqualung', type: :digital)
digital_item_order = Order.new(foolano)
digital_item_order.add_product(digital_item)

payment_digital_item = Payment.new(order: digital_item_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_digital_item.pay
if payment_digital_item.paid?
  foolano.send_voucher(payment_digital_item)
end


