class Customer
  attr_accessor :email, :coupons
  def initialize(email)
    @email = email
    @coupons = []
  end

  def add_coupon(value)
    @coupons << value
  end
end
