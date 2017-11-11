class Membership

  attr_reader :customer, :expire_at, :active

  def initialize(customer, expire_at: (Time.now + (60 * 60 * 24 * 30)))
    @customer = customer
    @expire_at = expire_at
  end

  def activate!
    @active = true
  end

  def active?
    active && @expire_at >= Time.now
  end

end