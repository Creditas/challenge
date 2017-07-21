module Membership
  def process
    send_email_to_for
    activate_membership_for
  end

  def activate_membership_for
    "Membership for customer activated"
  end

  def send_email_to_for
  	"Sending email to with details"
  end
end