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
    order.items.each do |item|
      item.shipping_method()
    end
    order.close(@paid_at)
  end

  def paid?
    !paid_at.nil?
  end
end

class Book
  def ship_it(context)
    shipping_label(context)
  end

  private

  def shipping_label(item)
    p "shipping label for #{item.product.name}, tax free"
  end
end

class Physical
  def ship_it(context)
    shipping_label(context)
  end

  private

  def shipping_label(item)
    p "shipping label for #{item.product.name}"
  end
end

class Signature
  def ship_it(context)
    activate_signature()
    send_notification(context)
  end

  private

  def send_notification(item)
    p "send notification for #{item.product.name}"
  end

  def activate_signature()
    p "Signature activated"
  end
end

class Media
  def ship_it(context)
    send_description(context)
    add_customer_voucher(context.order.customer)
  end

  private

  def send_description(item)
    p "Send description for #{item.product.name}"
  end

  def add_customer_voucher(customer)
    p "Voucher to #{customer}"
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

  def shipping_method
    self.product.type.ship_it(self)
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

# Book Example (build new payments if you need to properly test it)
foolano = Customer.new
book = Product.new(name: 'Awesome book', type: Book.new())
book_order = Order.new(foolano)
book_order.add_product(book)

payment_book = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_book.pay
p payment_book.paid? # < true
p payment_book.order.items.first.product.type

siclano = Customer.new
tv = Product.new(name: 'Dumb Tv', type: Physical.new())
tv_order = Order.new(siclano)
tv_order.add_product(tv)

payment_tv = Payment.new(order: tv_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_tv.pay
p payment_tv.paid? # < true
p payment_tv.order.items.first.product.type

beltrano = Customer.new
wine_pack = Product.new(name: 'Monthly wine pack', type: Signature.new())
wine_pack_order = Order.new(beltrano)
wine_pack_order.add_product(wine_pack)

payment_wine = Payment.new(order: wine_pack_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_wine.pay
p payment_wine.paid? # < true
p payment_wine.order.items.first.product.type

geek = Customer.new
album = Product.new(name: 'Disc album', type: Media.new())
album_order = Order.new(geek)
album_order.add_product(album)

payment_album = Payment.new(order: album_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_album.pay
p payment_album.paid? # < true
p payment_album.order.items.first.product.type
