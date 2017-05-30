class BaseMailer

  attr_reader :email_body, :order, :order_item

  def send_email(order_item:)
    @order_item = order_item
    @order = order_item.order
    @customer = order.customer
    @email_body = format_body

    # The following line would be replaced by the actual sending of the email
    { to: @customer.email, from: 'info@ourstore.com', body: @email_body }
  end

  protected

  def format_body
    raise NotImplementedError, "must implement format_body method"
  end

end
