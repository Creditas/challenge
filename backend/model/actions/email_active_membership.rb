class EmailActiveMembership < Action
  def after_payment(order_item)
    product_name = order_item.product.name
    client_name = order_item.order.customer.name
    email = order_item.order.customer.email
    p "******* sending email:"
    p "subject: Membership activated."
    p "email: #{email}."
    p "body: Your membership for #{product_name} was activated."
  end
end
