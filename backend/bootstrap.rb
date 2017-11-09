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
    shipping_type = @items.first.product.type
    SHIPPING_STRATEGIES[shipping_type].shipping(self) #### Pode ser substituido por multi_shipping(), conforme comentário.
  end

  #### Caso o pedido contenha mais de um tipo de produto
  def multi_shipping
    @items.each do |item|
      shipping_type = item.product.type
      SHIPPING_STRATEGIES[shipping_type].shipping(self)
    end
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
  attr_reader :vouchers, :memberships

  def initialize
    @vouchers = []
    @memberships = []
  end

end


class Membership
  attr_reader :customer, :actvated

  def initialize(customer)
    @customer = customer
    @activated = false
  end

  def activate!
    activate = true
  end
  # you can customize this class by yourself
end

class Voucher
  attr_reader :customer, :value
  def initialize(customer:,value:)
    @customer = customer
    @value = value
  end
end

module Mailer
  def send_mail(options = {} )
  end
end

module Labler
  def shipping_label(content)
    content
  end
end


class ProductShippingStrategy
  def shipping(order)
    raise "Not implemented yet"
  end
end

class PhysicalShippingStrategy < ProductShippingStrategy
  include Labler
  def shipping(order)
    shipping_label(order.address.zipcode)
  end
end

class BookShippingStrategy < ProductShippingStrategy
  include Labler
  def shipping(order)
    content = generate_label(order)
    shipping_label(content)
  end

  private
  def generate_label(order)
    "#{order.address.zipcode} - ITEM ISENTO"
  end
end

class DigitalShippingStrategy < ProductShippingStrategy
  include Mailer

  def shipping(order)
    message = generate_message(order)
    send_mail(message: message, destinatary: order.customer)
    generate_voucher(order.customer)
  end

  private
  def generate_message(order)
    "Order description"
  end

  def generate_voucher(customer)
    customer.vouchers << Voucher.new(customer: customer, value: 10.0)
  end
end

class MembershipShippingStrategy < ProductShippingStrategy
  include Mailer
  def shipping(order)
    activate_membership(order.customer)
    send_mail(message: "Your membership was activated successfully", desinatary: order.customer)
  end

  private
  def activate_membership(customer)
    membership = Membership.new(customer: customer)
    membership.activate!
    customer.memberships << membership
  end
end




SHIPPING_STRATEGIES = {
                        physical: PhysicalShippingStrategy.new,
                        book: BookShippingStrategy.new ,
                        digital: DigitalShippingStrategy.new,
                        membership: MembershipShippingStrategy.new
                      }

# Book Example (build new payments if you need to properly test it)
  foolano = Customer.new
  book = Product.new(name: 'Awesome book', type: :book)
  book_order = Order.new(foolano)
  book_order.add_product(book)

payment_book = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_book.pay
p payment_book.paid? # < true
p payment_book.order.items.first.product.type

# now, how to deal with shipping rules then?
