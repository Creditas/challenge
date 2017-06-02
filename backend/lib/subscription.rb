# i have changed the class membership because subscription because user subscribes a paying service. its not only become a club member 
class Subscription
  attr_reader :name, :active
  def initialize(name, active = true)
    @name = name
    @active = true
  end

  def cancel_subscription
    @active = false
  end
end