class CreditCard

  def initialize(customer, hash)
    @customer = customer
    @hash = hash
  end

  def pay(invoice)
    invoice.pay
  end
end