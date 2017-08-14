# frozen_string_literal: true

require_relative "#{Dir.pwd}/types/order_item_type"
require_relative "#{Dir.pwd}/services/email_service"

# Class responsible for handle a digital type
# Parent class is OrderItemType
class DigitalType < OrderItemType
  # attr_reader :customer, :product, :item

  # def initialize(customer, product, item)
  #   super(customer, product, item)
  # end

  # def handle
  def self.handle(customer, item)
    item.messages.push("Produto Digital adquirido: #{item.product.name}")

    EmailService.send(customer.email, item.messages)
  end
end
