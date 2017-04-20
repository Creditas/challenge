module Flows::PhysicalType
  def physical(payment, item)
    p '---Item Shipping Address'
    p payment.order.customer.name
    p payment.order.customer.address
  end

end