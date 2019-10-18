class Shipping
  def initialize(payment)
    @payment = payment
  end

  def ship_order
    @payment.order.items.each { |order_item| order_item.item.ship(@payment.order) }
  end
end
