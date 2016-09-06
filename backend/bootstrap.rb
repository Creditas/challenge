class Payment
  attr_reader :amount, :order, :payment_method
  attr_accessor :authorization_number, :invoice, :paid_at

  def initialize(order:, payment_method:)
    @order = order
    @amount = order.total_amount
    @payment_method = payment_method
  end

  def paid?
    !paid_at.nil?
  end
end

class PaymentService
  attr_reader :invoice_factory

  def initialize(invoice_factory)
    @invoice_factory = invoice_factory
  end

  # Fraud check could be a service of its own, but I've tried
  # to keep it simple here.
  def fraud?(payment)
    false
  end

  # I've removed Payment.pay method and placed it here because
  # it was braking the single responsibility principle.
  def charge(payment, paid_at = Time.now)
    payment.paid_at = paid_at
    payment.authorization_number = paid_at.to_i
    payment.order.close(paid_at)
    payment.invoice = @invoice_factory.create(payment.order)

    # We could also dispatch an event here

    payment
  end
end

class Invoice
  attr_reader :billing_address, :shipping_address, :order

  def initialize(attributes = {})
    @billing_address = attributes.fetch(:billing_address)
    @shipping_address = attributes.fetch(:shipping_address)
    @order = attributes.fetch(:order)
  end
end

class InvoiceFactory
  def create(order)
    Invoice.new(
        billing_address: order.address,
        shipping_address: order.address,
        order: order
    )
  end
end

class Order
  attr_reader :customer, :items, :closed_at
  attr_accessor :address

  def initialize(customer:)
    @customer = customer
    @items = []
  end

  def add_product(product)
    @items << OrderItem.new(order: self, product: product)
  end

  def total_amount
    @items.map(&:price).inject(:+)
  end

  def close(closed_at = Time.now)
    @closed_at = closed_at
  end
end

class OrderItem
  attr_reader :order, :product

  # OrderItem.price represents the actual price to be paid,
  # after discounts applied.
  attr_accessor :price

  def initialize(order:, product:)
    @order = order
    @product = product
    @price = product.price
  end
end

class Product
  attr_reader :name, :price, :attributes

  def initialize(name:, price:, attributes: {})
    @name = name
    @price = price
    @attributes = attributes
  end
end

# Virtual product, as the concept of a non-physical product.
class VirtualProduct < Product
end

# Digital product, such as downloadable contents.
class DigitalProduct < VirtualProduct
end

class Membership < VirtualProduct
  attr_accessor :active
end

class Address
  attr_reader :zipcode

  def initialize(zipcode:)
    @zipcode = zipcode
  end
end

class CreditCard
end

class CreditCardRepository
  def self.find_by_hash(hash)
    CreditCard.new
  end
end

class Customer
  attr_reader :name, :email

  def initialize(name:, email:)
    @name = name
    @email = email
  end
end

class MembershipService
  attr_reader :event_dispatcher

  def initialize(event_dispatcher)
    @event_dispatcher = event_dispatcher
  end

  def activate(customer:, membership:)
    membership.active = true

    @event_dispatcher.dispatch(:membership_activated, {
        customer: customer,
        membership: membership,
        activated_at: Time.now
    })
  end

  def deactivate(customer:, membership:)
    membership.active = false

    @event_dispatcher.dispatch(:membership_deactivated, {
        customer: customer,
        membership: membership,
        deactivated_at: Time.now
    })
  end
end