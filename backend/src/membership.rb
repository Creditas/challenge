class Membership
  
  def initialize()
    @active = false
  end

  def active!
    @active = true
  end

  def active?
    @active
  end
end
