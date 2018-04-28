class ProcessPayments::Providers::DigitalProcess < ProcessPayments::ProcessPayment

  def initialize(payment)
    super(payment)
  end

  def process
    @notification.send(@payment.order.customer.email, 'Digital Payment Success', Notifications::TemplateBuilder::Factory.create(@payment))
  end
end
