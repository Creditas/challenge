class DiscountPaymentAggregatorMock
  attr_accessor :applied_discount

  def initialize(discount_amount)
    @discount_amount = discount_amount
    @applied_discount = false
  end

  def apply_to(payment)
    @applied_discount = true
  end
end