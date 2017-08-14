# frozen_string_literal: true

require_relative "#{Dir.pwd}/types/order_item_type"
require_relative "#{Dir.pwd}/services/printer_service"

# Class responsible for handle a physical type
# Parent class is OrderItemType
class PhysicalType < OrderItemType
  attr_reader :customer, :product, :item

  def initialize(customer, product, item)
    super(customer, product, item)
  end

  def handle
    @item.shipping_labels.push('Item Físico - Não é isento de impostos')

    PrinterService.print(@item.shipping_labels)
  end
end
