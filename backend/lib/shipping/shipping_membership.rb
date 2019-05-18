require_relative './shipping_base'

module Shipping
  class ShippingMembership < ShippingBase
    def dispatch_now 
      p "## ativa assinatura"
      p "## send email "
    end
  end
end