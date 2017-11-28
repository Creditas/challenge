class Customer
  attr_reader :name, :email_address

  def initialize(name, email_address)
    @name = name
    @email_address = email_address
  end
end