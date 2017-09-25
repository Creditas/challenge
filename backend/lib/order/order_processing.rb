class OrderProcessing
  attr_reader :order, :payment

  def initialize(order:, payment:)
    @order, @payment = order, payment
  end

  def capture

    raise RuntimeError, "Order does not paid yet" unless payment.paid?

    puts <<ORDER_MESSAGE
  \n \n \n
############## ORDER ###########
Order Paid
Customer name: #{order.customer.name}
Customer e-mail: #{order.customer.email}
Value: #{order.total_amount}
ORDER_MESSAGE
  end

  def process
    order.items.each do |item|
      puts item.process
    end
  end
end