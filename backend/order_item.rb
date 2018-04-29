class OrderItem
  attr_reader :order, :product

  def initialize(order:, product:)
    @order = order
    @product = product
  end

  def total
    10
  end

  def send_order_item_description_email_to_customer
    p "Enviado email para #{@order.customer.email} sobre descrição da compra do item"
  end
end
