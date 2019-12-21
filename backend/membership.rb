class Membership < DigitalProduct
  def buy options
    super
    activate_membership_for options[:customer]
  end

  def activate_membership_for customer
    p "Membership #{name} for customer #{customer.name} activated"
    p "Sending email to #{customer.name} with details"
  end
end
