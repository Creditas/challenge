class Address
  attr_reader :zipcode
  
  def initialize(zipcode:)
    @zipcode = zipcode
  end

  def to_s
    "2 Riverside Lane"
  end
end