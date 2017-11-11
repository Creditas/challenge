require_relative 'shipping_label/book_shipping_label'
require_relative 'shipping_label/physical_shipping_label'

module Delivery
  class CreateShippingLabel

    LABEL_TYPES = {
      book: BookShippingLabel,
      physical: PhysicalShippingLabel
    }.freeze

    def initialize(item:)
      @item = item
    end

    def call
      shipping_label(@item.type).new(item: @item).generate
    end

    private

    def shipping_label(type)
      LABEL_TYPES[type]
    end
  end
end
