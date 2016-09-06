require_relative 'bootstrap'

module Shipping
  class Label
    attr_reader :name, :address, :shipping_items

    def initialize(name:, address:, shipping_items:)
      @name = name
      @address = address
      @shipping_items = shipping_items
    end

    def to_s
      # returns the label text
    end
  end

  class Item
    # Not quiet sure why a shipping label should know if an
    # item is taxes-free (it's not like a shipping label is
    # an invoice/fiscal coupon), but for the sake of the
    # challenge, here it is:
    attr_reader :item, :taxes_free

    def initialize(item:, taxes_free: false)
      @item = item
      @taxes_free = taxes_free
    end
  end

  class Service
    attr_reader :taxes_service

    def initialize(taxes_service)
      @taxes_service = taxes_service
    end

    def generate_label(order:, shippable_items:)
      Label.new(
          name: order.customer.name,
          address: order.address,
          shipping_items: shippable_items.map do |item|
            Item.new(
                item: item,
                taxes_free: @taxes_service.taxes_free?(item.product)
            )
          end
      )
    end
  end
end