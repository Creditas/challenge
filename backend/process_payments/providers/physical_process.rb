class ProcessPayments::Providers::PhysicalProcess < ProcessPayments::ProcessPayment

  def initialize(payment)
    super(payment)
  end

  def process
    Helpers::ShippingLabel.instance.generate(@payment)
  end
end
