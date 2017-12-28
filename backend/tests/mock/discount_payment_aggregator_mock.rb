class DiscountPaymentAggregatorMock
  attr_accessor :applied_discount

  def initialize(discount_amount)
    @discount_amount = discount_amount
  end

  def apply_to(payment)
    @applied_discount = true
  end
end