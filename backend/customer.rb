require_relative 'membership'

class Customer

    attr_reader :membership

    def initialize(attributes = {})
      @membership = Membership.new(customer: self)
    end

end
