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
    @items << @order_item_class.new(self, product)
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

  def initialize(order, product)
    @order = order
    @product = product
  end

  def total
    10
  end
end

class Product
  # use type to distinguish each kind of product: physical, book, digital, membership, etc.
  attr_reader :name, :type, :commom

  def initialize(name, type, commom = false)
    @name, @type, @commom = name, type, commom
  end

  def commom?
    @commom
  end
end

class Address
  attr_reader :zipcode

  def initialize(zipcode)
    @zipcode = zipcode
  end
end

class CreditCard
  def self.fetch_by_hashed(code)
    CreditCard.new
  end
end

class Customer
  attr_accessor :name, :email, :address, :memberships, :vouchers

  def initialize(name, email, address)
    @name         = name
    @email        = email
    @address      = address
    @memberships  = []
    @vouchers     = []
  end
end

class Voucher
  attr_reader :voucher

  def initialize(amount)
    @amount = amount
  end

  def amount
    @amount
  end
end

class Membership
  attr_reader :product
  attr_reader :activated

  def initialize(product, payment)
    @product = product
    @activated = payment.paid?
  end

  def active?
    @activated
  end

  def activate!
    @activated = true
  end
end

# Book Example (build new payments if you need to properly test it)
#foolano = Customer.new('Gabriel Hamdan', 'ghamdan.eng@gmail.com', 'Rua Alvorada, 735')
#book = Product.new('Awesome book', :book)
#book_order = Order.new(foolano)
#book_order.add_product(book)

#payment_book = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
#payment_book.pay
#p payment_book.paid? # < true
#p payment_book.order.items.first.product.type

# now, how to deal with shipping rules then?