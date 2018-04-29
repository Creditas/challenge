class DigitalItem
  attr_reader :name, :value

  def initialize(name:, value:)
    @name = name
    @value = value
  end

  def ship(order)
    send_order_item_description_email_to_customer(order)
    order.grant_discount_voucher
  end

  private

  def send_order_item_description_email_to_customer(order)
    p "Enviado email para #{order.customer.email} sobre descrição da compra do item"
  end
end
