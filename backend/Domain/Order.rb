require_relative './Address.rb'
require_relative './OrderItem.rb'

class Order
    attr_reader :customer, :product, :items, :payment, :address, :closed_at
  
    def initialize(customer, product, overrides = {})
      @customer = customer
      @items = []
      @order_item_class = overrides.fetch(:item_class) { OrderItem }
      @address = overrides.fetch(:address) { Address.new(zipcode: '45678-979') }
      @product = product
      add_product(@product)
      apply(product.order_type)
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