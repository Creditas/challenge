require_relative '../domain/payment_method'

class PaymentMethodRepository

  def find_customer_payment_methods(customer)
    [CreditCard.new(customer, '9e2d7a07bbc7fb515cd6')]
  end
end