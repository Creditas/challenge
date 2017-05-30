class EmailPayment < Action

  def after_payment(order_item)
    product_name = order_item.product.name
    client_name = order_item.order.customer.name
    email = order_item.order.customer.email
    p "******* sending email:"
    p "subject: Payment accepted."
    p "email: #{email}."
    p "body: You buy #{product_name} successfuly."
  end

end
