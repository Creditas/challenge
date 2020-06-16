require_relative '../membership/membership'

class MembershipDelivery

  def notify(event)
    product = event.description
    customer = event.customer
    Membership.new(customer, product)
  end

end