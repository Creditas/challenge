class MembershipOrderItem < OrderItem 
  attr_reader :membership, :mailer

  def initialize(order, product, membership, mailer)
    super(order, product)
    @membership = membership
    @mailer = mailer
  end

  def process
    super
    @membership.activate(self)
    @mailer.send_mail(@order.customer.email)
  end
end