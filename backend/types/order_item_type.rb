# frozen_string_literal: true

require_relative "#{Dir.pwd}/models/order_item"

# Base class for product types
# Children classes: BookType, DigitalType, MembershipType, and PhysicalType
class OrderItemType
  # attr_reader :customer, :product, :item

  # def initialize(customer, product, item)
  #   @customer = customer
  #   @product = product
  #   @item = item
  # end

  # def handle; end
  def self.handle; end
end
