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
    order.close(@paid_at)
  end

  def paid?
    !paid_at.nil?
  end
end

class Invoice
  attr_reader :billing_address, :shipping_address, :order

  def initialize(args)
    @billing_address = args.fetch(:billing_address)
    @shipping_address = args.fetch(:shipping_address)
    @order = args.fetch(:order)
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

  # remember: you can create new methods inside those classes to help you create
  # a better design
end

class OrderItem
  attr_reader :order, :product

  def initialize(args)
    @order = args.fetch(:order)
    @product = args.fetch(:product)
  end

  def total
    10
  end
end

class Product
  # use type to distinguish each kind of product: physical, book, digital,
  # membership, etc.
  attr_reader :name, :type

  def initialize(args)
    @name = args.fetch(:name)
    @type = args.fetch(:type)
  end
end

class Address
  attr_reader :zipcode

  def initialize(zipcode)
    @zipcode = zipcode
  end
end

class CreditCard
  def self.fetch_by_hashed(_)
    CreditCard.new
  end
end

class Customer
  # you can customize this class by yourself
end

class Membership
  # you can customize this class by yourself
end

# Book Example (build new payments if you need to properly test it)
foolano = Customer.new
book = Product.new(name: 'Awesome book', type: :book)
book_order = Order.new(foolano)
book_order.add_product(book)

payment_book = Payment.new(
  order: book_order,
  payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_book.pay
p payment_book.paid? # < true
p payment_book.order.items.first.product.type

# now, how to deal with shipping rules then?
