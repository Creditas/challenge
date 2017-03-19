class Customer
  attr_reader :name, :email, :address

  def initialize(name:, email:, address:)
    @name = name.capitalize
    @email = email
    @address = address
  end
end
