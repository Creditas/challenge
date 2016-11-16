class Membership
  attr_reader :client

  def initialize(attributes = {})
      @customer = attributes.values_at(:customer)
      @activated = false
  end

  def activate()
      @activated = true
      send_email("Your membership was activated!")
  end

  def deactivate()
      @activated = false
      send_email("Your membership was deactvated!")
  end

  def send_email(message)
      message
      #TODO Need to send an real e-mail to the client
  end

  def activated?
      @activated
  end
end
