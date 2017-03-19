class Voucher
  attr_reader :customer, :amount

  def initialize(customer, amount=10)
    @customer = customer
    @amount = amount
  end
end
