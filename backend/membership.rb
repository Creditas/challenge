require_relative "product"

class Membership < Product
  def ship(order)
    activate_customer_membership(order)
    send_order_item_description_email_to_customer(order)
  end

  private

  def activate_customer_membership(order)
    p "Assinatura de serviço para o comprador #{order.customer.name} ativada"
  end

  def send_order_item_description_email_to_customer(order)
    p "Enviado email para #{order.customer.email} sobre descrição da compra do item"
  end
end
