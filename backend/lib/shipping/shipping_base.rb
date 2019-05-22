module Shipping
  class ShippingBase
    def initialize(item) 
      @item = item
    end

    def dispatch_now
      raise 'Not implemented'
    end
  end
end