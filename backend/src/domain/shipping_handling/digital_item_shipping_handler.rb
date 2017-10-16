class DigitalItemShippingHandler
  DISCOUNT_VALUE = 10

  def initialize(order_repository, customer_repository, mailer)
    @order_repository = order_repository
    @customer_repository = customer_repository
    @mailer = mailer
  end

  def handle(order_item_closed)
    customer_id = order_item_closed.customer_id
    customer = @customer_repository.get_by(customer_id)
    customer.add_voucher(DISCOUNT_VALUE)

    order = @order_repository.get_by(order_item_closed.order_id)
    @mailer.send_email(customer.email, order.to_s)
  end
end