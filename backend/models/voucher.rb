class Voucher

  attr_reader :customer, :value

  def initialize(customer:, value:)
    @customer = customer
    @value = value
  end

  def self.create(customer:, value:)
    new(customer: customer, value: value)
  end

end
