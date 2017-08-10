#!/usr/bin/ruby -w

require "InvalidProductException"

class Order
  attr_reader :customer, :items, :payment, :address, :closed_at, :type
  
  def initialize(customer, type, overrides = {})
    @customer = customer
    @type = type
    @items = []
    @order_item_class = overrides.fetch(:item_class) { OrderItem }
    @address = overrides.fetch(:address) { Address.new(zipcode: '45678-979') }
  end
  
  def add_product(product)    
    if product.type !=  @type[:type]    
      raise InvalidProductException, "Impossível inserir um produto do tipo #{product.type} em uma ordem do tipo #{@type[:type]}"
    end
    
    @items << @order_item_class.new(order: self, product: product)
  end
  
  def total_amount
    @items.map(&:total).inject(:+)
  end
  
  def close(closed_at = Time.now)
    @closed_at = closed_at
  end
  
  def orderProductType
    @type
  end

  # remember: you can create new methods inside those classes to help you create a better design
end