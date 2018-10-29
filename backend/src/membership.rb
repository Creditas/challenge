class Membership
  
  def initialize(customer)
    @customer = customer
    @active = false
  end

  def active!
    @active = true
  end

  def active?
    @active
  end
end