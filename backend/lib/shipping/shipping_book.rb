require_relative './shipping_physical'
module Shipping
  class ShippingBook < Shipping::ShippingPhysical 

    def shipping_label_body
      super
      @shipping_label += "\t Produto isento de impostos conforme disposto na Constituição Art. 150, VI, d.\n"
    end
    
  end
end