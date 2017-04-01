require_relative 'pp_service'
require_relative '../../api/membership'
class MembershipPPService < PPService
  def serve
    super
    create_membership
  end

  def create_membership
    Membership.new(@invoice.order.customer.email).activate
  end
end
