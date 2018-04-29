class Membership
  attr_reader :name, :customer, :value

  def initialize(name:, customer:, value:)
    @name, @customer, @value = name, customer, value
  end

  def ship(order)
    item.activate_customer_membership
    send_order_item_description_email_to_customer(order)
  end

  private

  def activate_customer_membership
    p "Assinatura de serviço para o comprador #{@customer.name} ativada"
  end

  def send_order_item_description_email_to_customer(order)
    p "Enviado email para #{order.customer.email} sobre descrição da compra do item"
  end
end
