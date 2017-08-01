module Membership
  include Email

  def type
    ProductsType::MEMBERSHIP
  end

  def process customer
    activate_membership_for customer
    send_email_to customer
  end

  def activate_membership_for customer
    "Membership for customer activated"
  end

  def send_email_to customer
    message = "Hello #{customer.name}, your signature has been successfully activated."
    send_email(customer.email, message)
  end
end