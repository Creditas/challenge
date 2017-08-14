# frozen_string_literal: true

require_relative "#{Dir.pwd}/models/voucher"
Dir["#{Dir.pwd}/types/*"].each { |file| require_relative file }

# Class responsible for handle an order
class Order
  attr_reader :items, :address, :closed_at, :shipping, :customer
  attr_accessor :payment

  def initialize(customer, address)
    @customer = customer
    @items = []
    @address = address
  end

  def add_item(order_item)
    @items.push(order_item)
  end

  def total_amount
    total = 0.0

    @items.each { |item| total += item.product.value }

    total
  end

  def close(closed_at = Time.now)
    @closed_at = closed_at

    handle_order_items
  end

  private

  def handle_order_items
    @items.each do |item|
      # Take the item type (e.g. Book) and build the Type class (e.g. BookType)
      name = "#{item.product.type}Type"

      # Instances the class (e.g BookType.new(@customer, item.product, item))
      type_class = Object.const_get(name).new(@customer, item.product, item)

      # Call the handle method of the class
      type_class.handle

      check_for_voucher if item.product.type == 'Digital'
    end
  end

  def check_for_voucher
    return if @customer.has_voucher

    @customer.has_voucher = true
    @customer.voucher = Voucher.new('123', 10.0)
  end
end # end-class
