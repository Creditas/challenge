class ProcessPayments::Providers::BookProcess < ProcessPayments::ProcessPayment

  def initialize(payment)
    super(payment)
  end

  def process
    Helpers::ShippingLabel.instance.generate(@payment)
    @notification.send(@payment.order.customer.email, 'Book Payment Success', Notifications::TemplateBuilder::Factory.create(@payment))
  end
end
