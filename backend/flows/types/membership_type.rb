module Flows::MembershipType
  def membership(payment, item)
    customer = payment.order.customer
    membership = Membership.new(item.product, payment)

    customer.memberships << membership

    if payment.order.customer.memberships.last.active?
      p '---Email Send:'
      p "Dear #{customer.name},"
      p "Your membership in the product #{membership.product.name} has been activated."
    end

  end

end