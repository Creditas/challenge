require_relative "./ShipmentRule"
require_relative "../../ShippingLabelManager"

class BookShipmentRule < ShipmentRule

  def handle(customer, product)
    puts 'book rule'
    ShippingLabelManager.generate_shipping_label(customer, product, has_taxes: false)
  end

end