class Customer
  attr_accessor :membership, :voucher
  attr_reader :name, :address, :email

  def initialize(name:, address:, email:)
    @name = name
    @address = address
    @email = email
  end
end
