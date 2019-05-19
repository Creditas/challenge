require_relative './shipping_physical'
module Shipping
  class ShippingBook < Shipping::ShippingPhysical 
    def dispatch_now 
      customer = @item.order.customer
      address = @item.order.address
      opts = {
        Obs: 'Produto isento de impostos conforme disposto na Constituição Art. 150, VI, d'  
      }
      Printer::ShippingLabel.new(customer, address, opts).print
    end
  end
end