require_relative '../ValueObjects/Address.rb'
require_relative '../ValueObjects/OrderItem.rb'

class Order
    attr_reader :customer, :product, :items, :payment, :address, :closed_at
  
    def initialize(customer, overrides = {})
      @customer = customer
      @items = []
      @order_item_class = overrides.fetch(:item_class) { OrderItem }
    end
  
    def apply_payment(pay_method)
      @payment = Payment.new(order: self, payment_method: CreditCard.fetch_by_hashed('43567890-987654367'))
      @payment.pay
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

    def closed?
      !closed_at.nil?
    end

    def post_payment
        raise "Not Implemented Exception"
    end
    # remember: you can create new methods inside those classes to help you create a better design
  end