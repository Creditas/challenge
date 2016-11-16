require_relative 'membership'

class Customer

    attr_reader :membership

    def initialize(attributes = {})
        @authorization_number, @amount = attributes.values_at(:authorization_number, :amount)
      @signature = false
      @membership = Membership.new(customer: self)
    end

end
