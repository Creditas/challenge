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
    OrderPostProcessor.new(order: self).process
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

class OrderPostProcessor
  def initialize(order:)
    @order = order
  end

  def process
    if product_types.include?(:physical) || product_types.include?(:book)
      puts generate_shipping_label
    end
    activate_membership if product_types.include?(:membership)
    send_invoice if product_types.include?(:digital)
    send_voucher if product_types.include?(:digital)
  end

  def generate_shipping_label
    label = ['Dados de envio do consumidor']
    label << 'Inclui itens isentos de imposto' if product_types.include?(:book)
    ShippingLabel.new(order: @order, label: label.join("\n"))
  end

  private

  def product_types
    @order.items.map { |item| item.product.type }.uniq
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
end

class Membership
  # you can customize this class by yourself
end

class ShippingLabel
  def initialize(order:, label:)
    @order = order
    @label = label
  end

  def to_s
    @label
  end
end

require 'minitest/autorun'

class Bootstrap < Minitest::Test
  def test_provided_example
    foolano = Customer.new
    book = Product.new(name: 'Awesome book', type: :book)
    book_order = Order.new(foolano)
    book_order.add_product(book)
    book_payment = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))

    out, err = capture_io { book_payment.pay }
    assert book_payment.paid?
  end

  def test_shipping_label
    foolano = Customer.new
    book = Product.new(name: 'Awesome book', type: :book)
    pen = Product.new(name: 'Bic Cristal', type: :physical)

    book_order = Order.new(foolano)
    book_order.add_product(book)
    book_payment = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))

    out, err = capture_io { book_payment.pay }
    assert_match /Dados de envio do consumidor/, out
    assert_match /Inclui itens isentos de imposto/, out

    pen_order = Order.new(foolano)
    pen_order.add_product(pen)
    pen_payment = Payment.new(order: pen_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))

    out, err = capture_io { pen_payment.pay }
    assert_match /Dados de envio do consumidor/, out
    refute_match /Inclui itens isentos de imposto/, out

    mixed_order = Order.new(foolano)
    mixed_order.add_product(book)
    mixed_order.add_product(pen)
    mixed_payment = Payment.new(order: mixed_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))

    out, err = capture_io { mixed_payment.pay }
    assert_match /Dados de envio do consumidor/, out
    assert_match /Inclui itens isentos de imposto/, out
  end
end
