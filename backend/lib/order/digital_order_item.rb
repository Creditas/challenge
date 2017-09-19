class DigitalOrderItem < OrderItem
  def initialize(order:, product:)
    super
  end

  def pick
    puts "Getting digital item #{product.name} and key of access"
  end

  def ship
    puts "Sending e-mail to #{order.customer.email}"
    puts "Add R$ 10.00 to customer to use in the future"
    order.customer.add_credit(10.00)
  end

end