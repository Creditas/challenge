require_relative 'modules/product.rb'
class Membership
  include Product

  def initialize(name:)
    super
    @type = ProductsType::MEMBERSHIP
  end

  def process customer
    activate_membership_for customer
    send_email_to_for customer
  end

  def activate_membership_for customer
    "Membership for customer activated"
  end

  def send_email_to_for customer
    message = "Hello #{customer.name}, your signature has been successfully activated."
    Email.send(customer.email, message)
  end
end