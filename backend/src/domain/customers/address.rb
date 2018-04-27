class Address
  attr_reader :zipcode

  def initialize(zipcode:)
    @zipcode = zipcode
  end

  def to_s
  	"Zipcode: #{@zipcode}"
  end
end