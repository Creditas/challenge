require_relative "./ShipmentRule"
require_relative "../../EmailManager"

class MembershipShipmentRule < ShipmentRule

  def handle(customer, product)
    puts 'membership rule'
    customer.membership.activate_membership
    EmailManager.send_membership_activation_notification(customer)
  end

end