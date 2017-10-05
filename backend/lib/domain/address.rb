module Domain
  class Address
    attr_reader :zipcode

    def initialize(zipcode:)
      @zipcode = zipcode
    end
  end
end
