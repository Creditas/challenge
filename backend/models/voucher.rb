class Voucher

  attr_reader :customer, :value

  def initialize(customer:, value:)
    @customer = customer
    @value = value
  end
end
