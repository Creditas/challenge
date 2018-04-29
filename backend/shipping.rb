class Shipping
  def initialize
  end

  def ship(payment)
    payment.order.items.each do |order_item|
      case order_item.item.type
        when :physical
          print_shipping_label(:physical, payment.order.address.zipcode)
        when :membership
          order_item.item.activate_customer_membership
          send_order_item_description_email_to_customer(payment.order)
        when :book
          print_shipping_label(:book, payment.order.address.zipcode)
        when :digital
          send_order_item_description_email_to_customer(payment.order)
          payment.grant_discount_voucher
      end
    end
  end

  def print_shipping_label(item_type, shipping_address)
    item_type == :physical ? shipping_address : shipping_address + " Item isento de impostos conforme disposto na Constituição Art. 150, VI, d."
  end

  def send_order_item_description_email_to_customer(order)
    p "Enviado email para #{order.customer.email} sobre descrição da compra do item"
  end
end
