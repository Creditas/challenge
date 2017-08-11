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

  def shipping
    raise "Abstract method"
  end
end

class Book < Product
  def shipping
    p "Book shipping"
    p "Gera shipping label sem imposto"
    p "/n"
  end
end

class PhysicalItem < Product
  def shipping
    p "Physical Item shipping"
    p "Gera Shipping Label"
    p "/n"
  end
end

class ServiceSubscription < Product
  def shipping
    p "Service Subscription shipping"
    p "Ativar assinatura"
    p "Notificar usuário por email que assinatura foi ativada"
    p "/n"
  end
end

class DigitalMedia < Product

  def shipping
    p "Digital Media shipping"
    p "Enviar por email descrição do produto"
    p "Conceder voucher lde R$ 10 reais ao comprador associado"
    p "/n"
  end
end

class ShipmentManagement
  attr_accessor :order

  def initialize(order)
    @order = order
  end

  def shipping
    order.items.each do |item|
      p item.product.type
      item.product.shipping
    end
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


foolano = Customer.new

book = Book.new(name: 'Awesome book', type: :book)
digital_media = DigitalMedia.new(name: 'Awesome digital media', type: :digital_media)
service_subscription = ServiceSubscription.new(name: 'Awesome service subscription', type: :service_subscription)
physical_item = PhysicalItem.new(name: 'Awesome book', type: :physical_item)

order = Order.new(foolano)
order.add_product(book)
order.add_product(digital_media)
order.add_product(service_subscription)
order.add_product(physical_item)

payment_order = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_order.pay

if payment_order.paid?
  ShipmentManagement.new(payment_order.order).shipping
end
