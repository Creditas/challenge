require_relative "product"

class PhysicalItem < Product
  def ship(order)
    print_shipping_label(order.address.zipcode)
  end

  private

  def print_shipping_label(shipping_zipcode)
    shipping_zipcode + " label"
  end
end
