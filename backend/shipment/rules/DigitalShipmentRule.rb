require_relative "./ShipmentRule"
require_relative "../../EmailManager"

class DigitalShipmentRule < ShipmentRule

  def handle(customer, product)
    puts 'digital rule'
    customer.add_voucher(Voucher.new(10, customer))
    EmailManager.send_digital_media_confirmation(customer)
  end

end

