# frozen_string_literal: true

require_relative "#{Dir.pwd}/types/order_item_type"
require_relative "#{Dir.pwd}/services/printer_service"

# Class responsible for handle a book type
# Parent class is OrderItemType
class BookType < OrderItemType
  # attr_reader :customer, :product, :item

  # def initialize(customer, product, item)
  #   super(customer, product, item)
  # end

  # def handle
  def self.handle(item)
    item.shipping_labels.push('Item isento de impostos conforme Art.150, VI, d.')

    PrinterService.print(item.shipping_labels)
  end
end
