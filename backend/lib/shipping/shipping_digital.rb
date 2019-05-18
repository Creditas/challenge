require_relative './shipping_base'

module Shipping
  class ShippingDigital < ShippingBase
    def dispatch_now 
      p "## send email"
      p "## send voucher"
    end
  end
end