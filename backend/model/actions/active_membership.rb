class ActiveMembership < Action
  def after_payment(order_item)
    p "******* activating membership:"
    order_item.product.active(order_item.order.customer)
  end  
end
