class Membership

  def initialize(customer, product, active=true)
    @customer = customer
    @product = product
    @active = active
  end

  def activate
    @active = true
  end

  def revoke
    @active = false
  end

  def active?
    @active
  end
end
