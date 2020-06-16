require_relative '../delivery/delivery_request'
require_relative '../infra/pub_sub'
require_relative '../infra/topic'

class InvoiceProcessor

  def notify(paid_invoice)
    paid_invoice.list_products.each{ |product|
      PubSub.instance.publish(Topics::PRODUCT_SOLD, DeliveryRequest.new(product, paid_invoice.order))
    }
  end

end
