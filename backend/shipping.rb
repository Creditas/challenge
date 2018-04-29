class Shipping
  def initialize(payment)
    @payment = payment
  end

  def ship
    @payment.order.items.each { |order_item| order_item.item.ship(@payment.order) }
  end
end
