class Voucher
  attr_reader :email, :amount

  def initialize(email:, amount:)
    @email = email
    @amout = amount
  end

end
