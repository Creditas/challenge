class Membership
  attr_reader :customer_id

  def initialize(customer_id)
    @customer_id = customer_id
  end
end