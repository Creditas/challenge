require_relative './shipping_book'
require_relative './shipping_physical'
require_relative './shipping_digital'
require_relative './shipping_membership'

module Shipping
  class ShippingItem
    def initialize(item)
      @item = item
      @shipping_method = shipping_method_for(item.product.type)
    end

    def dispatch
      @shipping_method.new(@item).dispatch_now
    end

    private
    def shipping_method_for(type)
      
      shipping_method_by_product = {
        physical: Shipping::ShippingPhysical,
        book: Shipping::ShippingBook,
        digital: Shipping::ShippingDigital,
        membership: Shipping::ShippingMembership,
      }
      shipping_method_by_product.fetch(type.to_sym)
    end
  end
end