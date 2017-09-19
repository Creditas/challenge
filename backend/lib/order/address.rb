class Address
  attr_reader :street, :zipcode

  def initialize(street:, zipcode:)
    @street, @zipcode = street, zipcode
  end
end