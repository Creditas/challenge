require_relative "product"

class Book < Product
  def ship(order)
    print_shipping_label(order.address.zipcode)
  end

  private

  def print_shipping_label(shipping_zipcode)
    shipping_zipcode + " Item isento de impostos conforme disposto na Constituição Art. 150, VI, d."
  end
end
