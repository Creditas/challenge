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

payment_book = Payment.new(order: book_order, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
payment_book.pay
p payment_book.paid? # < true
p payment_book.order.items.first.product.type

# now, how to deal with shipping rules then?

=begin
Esta parte da solução visa usar os desing pattern GOF para manipula
os comportamentos do fluxo de pagamento e regras de envio.

Na visão do problema iniicialmente estarei usando o pattern Stategy
para escolher o fluxo de pagamento em tempo de execução.
=end

#1) Stategy - Classes que possuiram comportamentos
class BookPaymentFlow
    def process(payment:)
      puts "It book"
    end
end

class ServiceSubscriptionPaymentFlow
    def process(payment:)
      puts "It services subscription"
    end
end

class PhysicalItemPaymentFlow
    def process(payment:)
      puts "It physical item"
    end
end

class DigitalMediaPaymentFlow
    def process(payment:)
      puts "It Digital Media"
    end
end

#3) Factory - PaymentFlow que irá executar o fluxo de pagamento dependendo do tipo de item do pedido
class PaymentFlow
    attr_reader :payment, :flow

    def initialize(payment:)
      @payment = payment
      @flows = {book_flow: BookPaymentFlow.new, physical_item_flow: PhysicalItemPaymentFlow.new}
    end

    def execute()
      flow = @flows[:physical_item_flow]
      flow.process(payment: @payment)
    end
end

#4) Estrutura para realizar operações com email
class Email
  attr_reader :to, :from

  def initialize(to:, from:)
    @to, @from = to, from
  end

  def send(messages:)
    puts  " To: #{@to}, From: #{@from},  #{messages}"
  end
end

payment_flow = PaymentFlow.new(payment: payment_book)
payment_flow.execute()
