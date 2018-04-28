class ProcessPayments::ProcessPayment
  attr_reader :notification
  
  def initialize(payment, notification_type = :email)
    fail ArgumentError "payment should be value" if payment.nil?
    @payment = payment
    @notification = Notifications::Factory.create(notification_type)
  end

  def execute
    @payment.pay
    if @payment.paid?
      process
    end
  end

  def process
    fail NotImplementedError
  end
end
