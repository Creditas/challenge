module Shipping
  def self.label(order)
    return <<SHIPPING_LABEL
    # ========== SHIPPING LABEL =========
    # Customer: #{order.customer.name}
    # Address: #{order.shipping_address.street}
    # ===================================
SHIPPING_LABEL
  end
end