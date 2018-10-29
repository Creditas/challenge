class Customer
  attr_reader :name, :address, :email

  def initialize(name:, address:, email:)
    @name = name
    @address = address
    @email = email
  end

  def membership= membership
    @membership = membership
  end

  def membership
    @membership
  end
end