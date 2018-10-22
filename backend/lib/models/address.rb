class Address
  attr_reader :zipcode

  def initialize(zipcode:)
    @zipcode = zipcode
  end

  def to_s
    "Rua: Abcd, No.: 123\nCEP: #{zipcode}\nCidade: Efgh, Estado: IJ"
  end
end
