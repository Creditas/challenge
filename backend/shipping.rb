class Shipping
  def initialize
  end

  def ship(payment)
    payment.order.items.each do |order_item|
      case order_item.product.type
        when :physical
          print_shipping_label(:physical, payment.order.address.zipcode)
        when :membership
          order_item.product.activate_customer_membership
          order_item.send_order_item_description_email_to_customer
        when :book
          print_shipping_label(:book, payment.order.address.zipcode)
        when :digital
          order_item.send_order_item_description_email_to_customer
          payment.grant_discount_voucher
      end
    end
  end

  def print_shipping_label(product_type, shipping_address)
    product_type == :physical ? shipping_address : shipping_address + " Item isento de impostos conforme disposto na Constituição Art. 150, VI, d."
  end
end
