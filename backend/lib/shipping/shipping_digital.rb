require_relative './shipping_base'

module Shipping
  class ShippingDigital < ShippingBase
    def dispatch_now 
      Notifier::Mailer.available_product(@item)
      Notifier::Mailer.voucher(@item.order.customer, 10)
    end
  end
end