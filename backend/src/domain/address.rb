class Address
  attr_reader :customer, :zipcode

  def initialize(customer, zipcode)
    @customer = customer
    @zipcode = zipcode
  end
end
