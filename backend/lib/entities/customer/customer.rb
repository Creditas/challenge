class Customer
  attr_reader :billing_address, :shipping_address, :email

  def initialize(billing_address, shipping_address, email)
    @billing_address = billing_address
    @shipping_address = shipping_address
    @email = email
  end
end