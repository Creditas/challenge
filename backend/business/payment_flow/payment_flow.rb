class PaymentFlow
  attr_reader :payment

  def self.pay(payment)
    @payment = payment
    close_payment
    create_delivery_issues
    @payment
  end

  private
  def close_payment
    @payment.close!
  end

  def create_delivery_issues
    DeliveryIssues.create(payment.order_details)
  end
end
