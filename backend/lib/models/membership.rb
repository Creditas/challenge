class Membership
  attr_reader :email, :enabled

  def initialize(email:, enabled:)
    @email = email
    @enabled = enabled
  end
end
