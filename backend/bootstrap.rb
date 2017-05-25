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
    order.finish_order if paid?
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

  def finish_order
    order_send = OrderSend.new(order: self)
    order_send.send_order
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
  attr_reader :first_name, :last_name, :email, :voucher

  def initialize(first_name:, last_name:, email:, voucher: 0)
    @first_name = first_name
    @last_name = last_name
    @email = email
    @voucher = voucher
  end

  def voucher(value)
    @voucher = value
  end
end

class Membership
  attr_reader :start_membership_date, :end_membership_date, :customer
  
  def initialize(customer)
    @customer = customer
  end

  def add_membership
  end
end

class OrderSend
  attr_reader :order

  def initialize(attributes = {})
    @order = attributes.values_at(:order)
    @customer = @order.first.customer
    @address = @order.first.address
    @shipping = Shipping.new
  end

  def send_order
    @order.first.items.each do |item|
      send("send_#{item.product.type.to_s}", item)
    end
  end
  
  def send_physical(item)
    @shipping.shipping_label(@customer, @address, item, true)
  end

  def send_book(item)
    @shipping.shipping_label(@customer, @address, item, false)
  end

  def send_digital(item)
    @shipping.shipping_digital(@order, @customer, item)
    @customer.voucher(10)
  end

  def send_membership(item)
    membership = Membership.new(@customer)
    membership.add_membership
    @shipping.shipping_membership(membership)
  end
end

class Shipping

  def shipping_label(customer, address, item, with_tax)
  end

  def shipping_digital(order, customer, item)
  end

  def shipping_membership(membership)
  end
end


# Book Example (build new payments if you need to properly test it)
foolano = Customer.new(first_name: 'Marcelo', last_name: 'Diegues', email: 'marcelo.diegues.ferreira@gmail.com')
book = Product.new(name: 'Awesome book', type: :book)
book_order = Order.new(foolano)
book_order.add_product(book)

payment_book = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_book.pay
p payment_book.paid? # < true
p payment_book.order.items.first.product.type

# now, how to deal with shipping rules then?