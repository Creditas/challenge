class Customer
  # you can customize this class by yourself
  attr_reader :email, :name, :addresses

  def initialize(email:, name:, addresses: [])
    @email = email
    @name = name
    @addresses = addresses
  end

  def default_address
    @addresses.first
  end

end
