require_relative '../printer/shipping_label'
require_relative './shipping_base'
module Shipping
  class ShippingPhysical < ShippingBase
    def dispatch_now 
      customer = @item.order.customer
      address = @item.order.address
      Printer::ShippingLabel.new(customer, address).print
    end
  end
end