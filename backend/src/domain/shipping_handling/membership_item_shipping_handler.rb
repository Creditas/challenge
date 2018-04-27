require_relative 'membership'

class MembershipItemShippingHandler
  def initialize(membership_repository, customer_repository, mailer)
    @membership_repository = membership_repository
    @customer_repository = customer_repository
    @mailer = mailer
  end

  def handle(order_item_closed)
    customer_id = order_item_closed.customer_id
    membership = Membership.new(customer_id)
    @membership_repository.add(membership)

    customer = @customer_repository.get_by(customer_id)
    @mailer.send_email(customer.email, 'Sua assinatura foi ativada!')
  end
end