class Membership
  attr_reader :customer

  def initialize(customer:)
    @customer = customer
    @active = false
  end

  def activate!
    @active = true
  end

  def active?
    @active
  end
end
