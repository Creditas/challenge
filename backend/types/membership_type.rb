# frozen_string_literal: true

require_relative "#{Dir.pwd}/types/order_item_type"
require_relative "#{Dir.pwd}/services/email_service"
require_relative "#{Dir.pwd}/models/membership"

# Class responsible for handle a membership (subscription) type
# Parent class is OrderItemType
class MembershipType < OrderItemType
  # attr_reader :customer, :product, :item

  # def initialize(customer, product, item)
  #   super(customer, product, item)
  # end

  # def handle
  def self.handle(customer, item)
    item.messages.push("Assinatura de Serviço ativada: #{item.product.name}")

    EmailService.send(customer.email, item.messages)

    # activate_service
    activate_service(customer, item)
  end

  # def activate_service
  def self.activate_service(customer, item)
    since = Time.now
    service_name = item.product.name
    customer.membership = Membership.new(since, service_name)
  end
end # end-class
