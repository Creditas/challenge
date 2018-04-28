class ProcessPayments::Providers::MembershipProcess < ProcessPayments::ProcessPayment

  def initialize(payment)
    super(payment)
  end

  def process
    @payment.order.customer.to_member(@payment.membership)
    @notification.send(@payment.order.customer.email, 'Membership Success', Notifications::TemplateBuilder::Factory.create(@payment))
  end
end
