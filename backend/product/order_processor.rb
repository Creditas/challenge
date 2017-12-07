require_relative '../delivery/delivery_request'
require_relative '../customer/invoice.rb'
require_relative '../infra/pub_sub'
require_relative '../infra/topic'

class OrderProcessor

  def notify(closed_order)
    payment_method = closed_order.payment_method
    billing_address = payment_method.billing_address
    payment_method.pay(closed_order)
    invoice = Invoice.new(billing_address, closed_order)
    PubSub.instance.publish(Topics::PAID_INVOICE, invoice)
  end

end
