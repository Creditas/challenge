require_relative "./ShipmentRule"
require_relative "../../ShippingLabelManager"

class PhysicalProductShipmentRule < ShipmentRule

  def handle(customer, product)
    puts 'physical rule'
    ShippingLabelManager.generate_shipping_label(customer, product)
  end

end