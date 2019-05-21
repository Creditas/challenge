require_relative './shipping_base'

module Shipping
  class ShippingMembership < ShippingBase
    def dispatch_now 
      Membership.new.active!
      Notifier::Mailer.welcome_membership(@item.order.customer, @item)
    end
  end
end