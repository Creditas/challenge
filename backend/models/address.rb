# frozen_string_literal: true

# Class responsible for manage both Customer (billing) address
# and Order (shipping) address (could be the same as billing address)
# For this test, no changes was made in this class
class Address
  attr_reader :zipcode

  def initialize(zipcode)
    @zipcode = zipcode
  end
end
