class Customer
  attr_reader :name, :email, :address

  def initialize(name:, email:)
    @name = name
    @email = email
    @voucher = 0
  end
end
