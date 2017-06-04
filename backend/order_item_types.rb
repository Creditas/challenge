# -*- encoding : utf-8 -*-
class OrderItemType
  def handle (payment) 
  end
end

class Physical < OrderItemType
  def handle (payment)
    payment.order.put_shipping_label ShippingLabel.simple
   end
end

class BookType < OrderItemType
  
  def handle (payment)
    payment.order.put_shipping_label ShippingLabel.withNotification
   end
end

class ServiceSubscription < OrderItemType

  attr_reader :activated
  
  def initialize
    @activated = false
  end
  
  def handle (payment)
    @activated = true
    payment.order.customer.notifyViaEmail 'service activated'
   end
end

class DigitalMedia < OrderItemType
  def handle (payment)
    payment.order.customer.notifyViaEmail 'buy description'
    payment.order.customer.receive Voucher.new('123456')
   end
end