Dir[File.dirname(__FILE__) + '/rules/*.rb'].each {|file| require file }

class ShipmentManager
  attr_reader :rules

  def initialize
    @rules = {}
    @rules[:physical] = PhysicalProductShipmentRule.new
    @rules[:book] = BookShipmentRule.new
    @rules[:digital] = DigitalShipmentRule.new
    @rules[:membership] = MembershipShipmentRule.new
  end

  def handle_shipment_rules(customer, payment)
    payment.order.items.each do |item|
      @rules[item.product.type].handle(customer, item.product)
    end
  end
end
