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
  attr_reader :customer, :items, :payment, :address, :closed_at, :discount_voucher

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

  # Dummy implementation of send email
  def send_email
    puts '********** ORDER DETAILS EMAIL ************'
    puts "Order sent to: #{@customer.email}"
    puts "Products: "
    @items.each_with_index do |item, index|
      puts (index + 1).to_s + ".-"
      puts "\tProduct name: #{item.product.name}"
      puts "\tProduct type: #{item.product.type}"
    end

    if has_discount_voucher?
      puts "By your purchase you have a discount voucher of R$ #{@discount_voucher.value}"
      puts "Claim with this code: #{@discount_voucher.code}"
    end
    puts '*******************************************'
  end

  def has_discount_voucher?
    @discount_voucher
  end

  def add_discount_voucher(discount_voucher)
    @discount_voucher = discount_voucher
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
  attr_reader :email, :shipping_address

  def initialize(attributes = {})
    @email, @shipping_address = attributes.values_at(:email, :shipping_address)
  end
end

class Membership
  attr_reader :order, :activated

  def initialize(order)
    @order = order
    @activated = false
  end

  def activate
    @activated = true
  end

  def deactivate
    @activated = false
  end

  def customer
    @order.customer
  end

  def product
    @order.items.first.product
  end

  def activated?
    return @activated
  end
end

class ShippingLabel
  attr_reader :order, :label

  def initialize(order)
    @order = order
    @label = Array.new(10){(rand(25) + 65).chr}.join # Generate a random unique string 10-length for the label using A..Z chars

    if @order.items.first.product.type != :book
      @tax = 4.0
    end
  end

  def tax_exempt?
    @order.items.first.product.type == :book
  end

  def tax
    tax_exempt? ? 'exepmted*' : @tax.to_s + '%'
  end

  def address
    @order.customer.shipping_address
  end

  # Dummy implementation of the print method
  def print
    puts '********** SHIPPING LABEL ***********'
    puts "Shipping label: #{@label}"
    puts "Shipping address: #{address.zipcode}"
    puts "Tax: #{tax}"
    puts "This box contains this products: "
    @order.items.each_with_index do |item, index|
      puts (index + 1).to_s + ".-"
      puts "\tProduct name: #{item.product.name}"
      puts "\tProduct type: #{item.product.type}"
    end
    if tax_exempt?
      puts "\n* THE TAX HAS BEEN EXEMPTED DUE THE CONSTITUTION ART. 150, VI, d."
    end
    puts '*************************************'
  end
end

class DiscountVoucher
  attr_reader :value, :code, :claimed

  def initialize(value)
    @value = value
    @code = Array.new(5){(rand(10))}.join # Generate a random unique string 5-lenght for the code using 0..9 chars
    @claimed = false
  end

  def claim
    @claimed = true
  end

  def claimed?
    @claimed
  end
end

class Shipping
  attr_reader :payment, :error

  SHIPMENT_METHOD_NOT_SUPPORTED = 0
  ORDER_NOT_PAID = 1

  def initialize(payment)
    @payment = payment
  end

  def deliver
    if !payment.paid?
      @error = ORDER_NOT_PAID
      return false
    end

    order = @payment.order
    customer = order.customer
    product = order.items.first.product

    case product.type
    when :book
      shipping_label = ShippingLabel.new(order)
      shipping_label.print
    when :physical
      shipping_label = ShippingLabel.new(order)
      shipping_label.print
    when :membership
      membership = Membership.new(order)
      membership.activate
      order.send_email
    when :digital
      order.add_discount_voucher(DiscountVoucher.new(10))
      order.send_email
    else
      @error = SHIPMENT_METHOD_NOT_SUPPORTED
      return false
    end

    return true
  end
end

# Book Example (build new payments if you need to properly test it)
customer = Customer.new(email: 'test@test.com', shipping_address: Address.new(zipcode: '5101'))
product = Product.new(name: 'Awesome product', type: :digital)
order = Order.new(customer)
order.add_product(product)

payment = Payment.new(order: order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment.pay

# now, how to deal with shipping rules then?
shipping = Shipping.new(payment)
if shipping.deliver
  puts "RESULT: The order has been delivered successfully"
else
  errMsg = "ERROR: "
  case shipping.error
  when Shipping::SHIPMENT_METHOD_NOT_SUPPORTED
    errMsg = errMsg + "Shipment method not supported"
  when Shipping::ORDER_NOT_PAID
    errMsg = errMsg + "Order not paid yet"
  end

  puts errMsg
end
